import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Grid, 
  List, 
  ChevronDown, 
  Info, 
  Download, 
  File, 
  Image, 
  FileText, 
  Music, 
  Film, 
  CheckSquare,
  Trash,
  Share2,
  Copy,
  Star,
  Moon,
  Sun
} from "lucide-react";

const FolderManager = () => {
  // State management
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPath, setCurrentPath] = useState(["Internal Storage"]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Sample files data
  const [files, setFiles] = useState([
    { id: 1, name: "English CV", type: "pdf", size: "2.4 MB", modified: "2023-10-12", path: "/SarhaneGhribi-eng.pdf", starred: false },
    { id: 2, name: "French CV", type: "pdf", size: "2.3 MB", modified: "2023-10-15", path: "/SarhaneGhribi-fr.pdf", starred: false },
    { id: 3, name: "Project Presentation", type: "ppt", size: "5.8 MB", modified: "2023-09-28", path: "/presentation.ppt", starred: true },
    { id: 4, name: "Vacation Photo", type: "jpg", size: "3.2 MB", modified: "2023-08-10", path: "/vacation.jpg", starred: false },
    { id: 5, name: "Meeting Notes", type: "txt", size: "0.1 MB", modified: "2023-10-25", path: "/notes.txt", starred: false },
    { id: 6, name: "Project Video", type: "mp4", size: "15.6 MB", modified: "2023-07-18", path: "/project.mp4", starred: false },
    { id: 7, name: "Summer Playlist", type: "mp3", size: "8.7 MB", modified: "2023-06-05", path: "/summer.mp3", starred: true },
   // { id: 8, name: "Contract", type: "pdf", size: "1.1 MB", modified: "2023-09-05", path: "/contract.pdf", starred: false },
  ]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(false);
      setIsFilterMenuOpen(false);
      setIsSortMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Toggle functions
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
    setIsFilterMenuOpen(false);
    setIsSortMenuOpen(false);
  };

  const toggleFilterMenu = (e) => {
    e.stopPropagation();
    setIsFilterMenuOpen(!isFilterMenuOpen);
    setIsDropdownOpen(false);
    setIsSortMenuOpen(false);
  };

  const toggleSortMenu = (e) => {
    e.stopPropagation();
    setIsSortMenuOpen(!isSortMenuOpen);
    setIsDropdownOpen(false);
    setIsFilterMenuOpen(false);
  };

  const toggleSearch = (e) => {
    e.stopPropagation();
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // File handling functions
  const handleFileClick = (file) => {
    if (isSelectionMode) {
      toggleFileSelection(file);
    } else {
      setSelectedFile(file);
      setIsInfoPanelOpen(true);
    }
  };

  const toggleFileSelection = (file) => {
    if (selectedFiles.find(f => f.id === file.id)) {
      setSelectedFiles(selectedFiles.filter(f => f.id !== file.id));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const handleFileAction = (action, file = selectedFile) => {
    switch (action) {
      case "open":
        window.open(file.path, "_blank");
        break;
      case "download":
        const link = document.createElement("a");
        link.href = file.path;
        link.download = file.name;
        link.click();
        break;
      case "delete":
        setFiles(files.filter(f => !selectedFiles.includes(f)));
        setSelectedFiles([]);
        setIsSelectionMode(false);
        break;
      case "star":
        const updatedFiles = files.map(f => 
          f.id === file.id ? {...f, starred: !f.starred} : f
        );
        setFiles(updatedFiles);
        setSelectedFile({...file, starred: !file.starred});
        break;
      default:
        break;
    }
  };

  const enterSelectionMode = () => {
    setIsSelectionMode(true);
    setSelectedFiles([]);
  };

  const exitSelectionMode = () => {
    setIsSelectionMode(false);
    setSelectedFiles([]);
  };

  // Get icon based on file type
  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText size={28} className="text-red-500" />;
      case "jpg":
      case "png":
        return <Image size={28} className="text-blue-500" />;
      case "txt":
        return <File size={28} className="text-gray-500" />;
      case "mp3":
        return <Music size={28} className="text-green-500" />;
      case "mp4":
        return <Film size={28} className="text-purple-500" />;
      case "ppt":
        return <FileText size={28} className="text-orange-500" />;
      default:
        return <File size={28} className="text-gray-500" />;
    }
  };

  // Filter files based on search text
  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Sort files
  const sortedFiles = [...filteredFiles].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "date":
        return new Date(b.modified) - new Date(a.modified);
      case "size":
        return parseFloat(b.size) - parseFloat(a.size);
      case "type":
        return a.type.localeCompare(b.type);
      case "starred":
        return (b.starred ? 1 : 0) - (a.starred ? 1 : 0);
      default:
        return 0;
    }
  });

  // Navigation
  const navigateTo = (index) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  const mainBgColor = isDarkMode ? "bg-gray-900" : "bg-gray-100";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const secondaryBgColor = isDarkMode ? "bg-gray-800" : "bg-white";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-300";
  const iconColor = isDarkMode ? "text-gray-300" : "text-gray-600";
  const highlightColor = "bg-blue-500";

  return (
    <div className={`flex flex-col h-screen w-full ${mainBgColor} ${textColor} transition-colors duration-300`}>
      {/* Top Navigation */}
      <div className={`flex items-center justify-between px-4 py-3 ${secondaryBgColor} ${borderColor} border-b shadow-sm`}>
        <div className="flex items-center">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center overflow-x-auto">
            {currentPath.map((path, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <ChevronDown className="mx-1 h-4" />}
                <span 
                  className={`text-sm font-medium cursor-pointer hover:text-blue-500 ${index === currentPath.length - 1 ? "text-blue-500" : ""}`}
                  onClick={() => navigateTo(index)}
                >
                  {path}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <button onClick={toggleViewMode} className={`p-2 rounded-full ${iconColor} hover:bg-gray-700`}>
            {viewMode === "grid" ? <List size={20} /> : <Grid size={20} />}
          </button>
          
          {/* Theme Toggle */}
          <button onClick={toggleDarkMode} className={`p-2 rounded-full ${iconColor} hover:bg-gray-700`}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* Search Button */}
          <button onClick={toggleSearch} className={`p-2 rounded-full ${iconColor} hover:bg-gray-700`}>
            <Search size={20} />
          </button>
          
          {/* Sort Button */}
          <div className="relative">
            <button onClick={toggleSortMenu} className={`p-2 rounded-full ${iconColor} hover:bg-gray-700`}>
              <ChevronDown size={20} />
            </button>
            
            {isSortMenuOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${secondaryBgColor} ${borderColor} border z-10`}>
                <div className="py-1">
                  <div className="px-4 py-2 text-sm font-medium border-b border-gray-700">Sort by</div>
                  <button 
                    onClick={() => {setSortBy("name"); setIsSortMenuOpen(false);}}
                    className={`block px-4 py-2 text-sm w-full text-left ${sortBy === "name" ? "text-blue-500" : ""} hover:bg-gray-700`}
                  >
                    Name
                  </button>
                  <button 
                    onClick={() => {setSortBy("date"); setIsSortMenuOpen(false);}}
                    className={`block px-4 py-2 text-sm w-full text-left ${sortBy === "date" ? "text-blue-500" : ""} hover:bg-gray-700`}
                  >
                    Date
                  </button>
                  <button 
                    onClick={() => {setSortBy("size"); setIsSortMenuOpen(false);}}
                    className={`block px-4 py-2 text-sm w-full text-left ${sortBy === "size" ? "text-blue-500" : ""} hover:bg-gray-700`}
                  >
                    Size
                  </button>
                  <button 
                    onClick={() => {setSortBy("type"); setIsSortMenuOpen(false);}}
                    className={`block px-4 py-2 text-sm w-full text-left ${sortBy === "type" ? "text-blue-500" : ""} hover:bg-gray-700`}
                  >
                    Type
                  </button>
                  <button 
                    onClick={() => {setSortBy("starred"); setIsSortMenuOpen(false);}}
                    className={`block px-4 py-2 text-sm w-full text-left ${sortBy === "starred" ? "text-blue-500" : ""} hover:bg-gray-700`}
                  >
                    Starred
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Filter Button */}
          <div className="relative">
            <button onClick={toggleFilterMenu} className={`p-2 rounded-full ${iconColor} hover:bg-gray-700`}>
              <Filter size={20} />
            </button>
            
            {isFilterMenuOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${secondaryBgColor} ${borderColor} border z-10`}>
                <div className="py-1">
                  <div className="px-4 py-2 text-sm font-medium border-b border-gray-700">Filter by type</div>
                  <button className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700">All files</button>
                  <button className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700">PDF</button>
                  <button className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700">Images</button>
                  <button className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700">Documents</button>
                  <button className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700">Media</button>
                  <button className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700">Starred</button>
                </div>
              </div>
            )}
          </div>
          
          {/* More Options Button */}
          <div className="relative">
            <button onClick={toggleDropdown} className={`p-2 rounded-full ${iconColor} hover:bg-gray-700`}>
              <MoreVertical size={20} />
            </button>
            
            {isDropdownOpen && (
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${secondaryBgColor} ${borderColor} border z-10`}>
                <div className="py-1">
                  <button 
                    onClick={enterSelectionMode}
                    className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700"
                  >
                    Select files
                  </button>
                  <button className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700">New folder</button>
                  <button className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700">FTP</button>
                  <button className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700">Transfer files</button>
                  <button className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700">Storage</button>
                  <button className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700">Clean up</button>
                  <button className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-700">Settings</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      {isSearchOpen && (
        <div className={`px-4 py-2 ${secondaryBgColor} border-b ${borderColor}`}>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={`w-full py-2 pl-10 pr-4 rounded-lg focus:outline-none ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`}
            />
          </div>
        </div>
      )}
      
      {/* Selection Mode Bar */}
      {isSelectionMode && (
        <div className={`flex items-center justify-between px-4 py-3 ${secondaryBgColor} ${borderColor} border-b`}>
          <div className="flex items-center">
            <button 
              onClick={exitSelectionMode}
              className="mr-4 font-medium text-blue-500"
            >
              Cancel
            </button>
            <span>{selectedFiles.length} selected</span>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => handleFileAction("delete")}
              className={`p-2 rounded-full ${iconColor} hover:bg-gray-700 ${selectedFiles.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={selectedFiles.length === 0}
            >
              <Trash size={20} />
            </button>
            <button 
              className={`p-2 rounded-full ${iconColor} hover:bg-gray-700 ${selectedFiles.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={selectedFiles.length === 0}
            >
              <Share2 size={20} />
            </button>
            <button 
              className={`p-2 rounded-full ${iconColor} hover:bg-gray-700 ${selectedFiles.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={selectedFiles.length === 0}
            >
              <Copy size={20} />
            </button>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex flex-0.8 overflow-hidden">
        {/* Files Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {sortedFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FileText size={48} className="mb-4" />
              <p>No files found</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {sortedFiles.map((file) => (
                <div 
                  key={file.id}
                  onClick={() => handleFileClick(file)}
                  className={`relative flex flex-col items-center p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                    isSelectionMode && selectedFiles.find(f => f.id === file.id) 
                      ? `${highlightColor} text-white` 
                      : `${secondaryBgColor} hover:bg-opacity-80`
                  } ${borderColor} border`}
                >
                  {file.starred && (
                    <div className="absolute top-2 right-2">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    </div>
                  )}
                  {getFileIcon(file.type)}
                  <span className="mt-2 text-sm font-medium text-center truncate w-full">{file.name}</span>
                  <span className="text-xs text-gray-500 mt-1">{file.size}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className={`rounded-lg overflow-hidden ${secondaryBgColor} ${borderColor} border`}>
              {sortedFiles.map((file, index) => (
                <div 
                  key={file.id}
                  onClick={() => handleFileClick(file)}
                  className={`flex items-center px-4 py-3 ${
                    isSelectionMode && selectedFiles.find(f => f.id === file.id) 
                      ? `${highlightColor} text-white` 
                      : `hover:bg-opacity-80`
                  } ${index !== sortedFiles.length - 1 ? `border-b ${borderColor}` : ""}`}
                >
                  <div className="flex-shrink-0 mr-3">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      {file.starred && (
                        <Star size={16} className="ml-2 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {file.size} • {new Date(file.modified).toLocaleDateString()}
                    </p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(file);
                      setIsInfoPanelOpen(true);
                    }}
                    className={`p-2 rounded-full ${iconColor} hover:bg-gray-700`}
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Info Panel */}
        {isInfoPanelOpen && selectedFile && (
          <div className={`w-80 border-l ${borderColor} ${secondaryBgColor} overflow-y-auto`}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">File Info</h3>
                <button 
                  onClick={() => setIsInfoPanelOpen(false)}
                  className={`p-1 rounded-full ${iconColor} hover:bg-gray-700`}
                >
                  <ChevronDown size={20} />
                </button>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className={`p-8 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                  {getFileIcon(selectedFile.type)}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">File name</p>
                  <p className="font-medium">{selectedFile.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{selectedFile.type.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="font-medium">{selectedFile.size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Modified</p>
                  <p className="font-medium">{new Date(selectedFile.modified).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium truncate">{currentPath.join(" / ")}</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => handleFileAction("open")}
                  className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                >
                  Open
                </button>
                <button
                  onClick={() => handleFileAction("download")}
                  className="w-full py-2 flex justify-center items-center bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  <Download size={16} className="mr-2" />
                  Download
                </button>
                <button
                  onClick={() => handleFileAction("star")}
                  className={`w-full py-2 flex justify-center items-center ${
                    selectedFile.starred ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-700 hover:bg-gray-600"
                  } text-white font-medium rounded-lg transition-colors`}
                >
                  <Star size={16} className="mr-2" />
                  {selectedFile.starred ? "Unstar" : "Star"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderManager;