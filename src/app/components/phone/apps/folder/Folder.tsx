import React, { useState } from "react";
import { FaEllipsisV, FaFilter, FaSearch } from "react-icons/fa";

const Folder = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isCvMenuOpen, setIsCvMenuOpen] = useState(false);
  const [selectedCv, setSelectedCv] = useState<
    "English" | "French" | "Canadian" | null
  >(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(!isFilterMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleCvMenu = (cvType: "English" | "French" | "Canadian") => {
    setSelectedCv(cvType);
    setIsCvMenuOpen(!isCvMenuOpen);
  };

  const cvFiles: Record<"English" | "French" | "Canadian", string> = {
    English: "/SarhaneGhribi-eng.pdf",
    French: "/SarhaneGhribi-fr.pdf",
    Canadian: "/SarhaneGhribi-fr-ca.pdf",
  };

  const handlePdfAction = (action: "open" | "download") => {
    if (selectedCv) {
      const pdfFile = cvFiles[selectedCv];
      if (action === "open") {
        window.open(pdfFile, "_blank");
      } else if (action === "download") {
        const link = document.createElement("a");
        link.href = pdfFile;
        link.download = pdfFile;
        link.click();
      }
      setIsCvMenuOpen(false);
    }
  };

  // CV options
  const cvOptions: { type: "English" | "French" | "Canadian"; label: string }[] = [
    { type: "English", label: "English CV" },
    { type: "French", label: "French CV" },
    { type: "Canadian", label: "Canadian CV" },
  ];

  // Filtered CV options based on search text
  const filteredCvs = cvOptions.filter((cv) =>
    cv.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <div style={styles.icon} onClick={toggleSearch}>
          <FaSearch />
        </div>

        <div style={styles.icon} onClick={toggleFilterMenu}>
          <FaFilter />
        </div>

        <div style={styles.icon} onClick={toggleDropdown}>
          <FaEllipsisV />
        </div>

        {isDropdownOpen && (
          <div style={styles.dropdown}>
            <ul style={styles.dropdownList}>
              <li style={styles.dropdownListItem}>FTP</li>
              <li style={styles.dropdownListItem}>Transfer files</li>
              <li style={styles.dropdownListItem}>Storage</li>
              <li style={styles.dropdownListItem}>Clean up</li>
              <li style={styles.dropdownListItem}>Settings</li>
            </ul>
          </div>
        )}

        {isFilterMenuOpen && (
          <div style={styles.filterMenu}>
            <h3 style={styles.filterTitle}>Feature settings</h3>
          </div>
        )}
      </div>

      <div style={styles.cvContainer}>
        {filteredCvs.map((cv) => (
          <div
            key={cv.type}
            style={styles.cvIconContainer}
            onClick={() => toggleCvMenu(cv.type)}
          >
            <img src="/pdf.png" alt={cv.label} style={styles.cvIcon} />
            <p style={styles.iconText}>{cv.label}</p>
          </div>
        ))}
      </div>

      {isCvMenuOpen && selectedCv && (
        <div
          style={{
            ...styles.cvMenu,
            left:
              selectedCv === "English"
                ? "3rem"
                : selectedCv === "French"
                ? "7.5rem"
                : "12rem",
          }}
        >
          <h4>{selectedCv} CV</h4>
          <div
            style={styles.menuOption}
            onClick={() => handlePdfAction("open")}
          >
            Open
          </div>
          <div
            style={styles.menuOption}
            onClick={() => handlePdfAction("download")}
          >
            Download
          </div>
        </div>
      )}

      {isSearchOpen && (
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={styles.searchInput}
        />
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    padding: "20px",
    width: "100%",
    height: "100%",
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    position: "relative",
  },
  icon: {
    margin: "0 10px",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "30px",
    right: "0",
    backgroundColor: "#292827",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "10px",
    zIndex: 1,
  },
  dropdownList: {
    listStyleType: "none",
    padding: "0",
  },
  dropdownListItem: {
    margin: "5px 0",
    cursor: "pointer",
    fontWeight: "bold",
  },
  filterMenu: {
    position: "absolute",
    top: "30px",
    right: "50px",
    width: "100vw",
    backgroundColor: "#000",
    color: "#fff",
    padding: "20px",
    zIndex: 1,
  },
  filterTitle: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "white",
  },
  searchInput: {
    width: "100%",
    padding: "5px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
  },
  cvContainer: {
    display: "flex",
    gap: "12px",
    position: "absolute",
    top: "95px",
    left: "20px",
  },
  cvIconContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  },
  cvIcon: {
    height: "3.75rem",
    width: "3.75rem",
  },
  cvMenu: {
    position: "absolute",
    top: "60px",
    left: "10px",
    backgroundColor: "#292827",
    color: "white",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1,
  },
  menuOption: {
    padding: "5px 10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  iconText: {
    fontSize: "13px",
    color: "white",
    fontWeight: "600",
  },
};

export default Folder;
