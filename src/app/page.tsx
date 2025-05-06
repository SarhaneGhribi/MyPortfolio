"use client";
import { useState, useEffect } from "react";
import PhoneFrame from "./components/phone/PhoneFrame";
import Image from "next/image";
import { Github, Linkedin, Mail, Download, Code } from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation effect when loading
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="grid h-screen grid-cols-3 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Phone Section (1/3) */}
      <div className="flex justify-center items-center bg-opacity-30 bg-black backdrop-blur-sm">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <PhoneFrame />
        </div>
      </div>

      {/* Content Section (2/3) */}
      <div className="grid grid-rows-[10fr_8fr] col-span-2">
        {/* Top Section - Bio & Navigation */}
        <div className="grid grid-cols-2">
          {/* Profile Info */}
          <div className="flex flex-col justify-center items-center p-8 bg-opacity-10 bg-white backdrop-blur-sm">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-75 group-hover:opacity-100 transition duration-300 blur"></div>
              <Image
                src={"https://avatars.githubusercontent.com/u/124355119?v=4"}
                alt="Profile image"
                width={180}
                height={180}
                className="rounded-full relative z-10"
              />
            </div>
            <h1 className="text-3xl font-bold mt-6 mb-2">Sarhane Ghribi</h1>
            <h2 className="text-xl font-medium text-blue-300 mb-4">Full-Stack Developer</h2>
            <p className="text-center text-gray-300 max-w-md">
              Specializing in mobile development with expertise in React Native, AI integration, and interactive UX design.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="https://github.com/SarhaneGhribi" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/sarhaneghribi" target="_blank" rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="mailto:sarhane.ghribi@gmail.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Navigation & Skills */}
          <div className="bg-opacity-5 bg-white backdrop-blur-sm p-8 flex flex-col">
            <nav className="mb-8">
              <ul className="flex space-x-6 text-lg">
                <li>
                  <button 
                    onClick={() => setActiveSection("about")}
                    className={`pb-1 ${activeSection === "about" ? "border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection("skills")}
                    className={`pb-1 ${activeSection === "skills" ? "border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
                  >
                    Skills
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection("projects")}
                    className={`pb-1 ${activeSection === "projects" ? "border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveSection("contact")}
                    className={`pb-1 ${activeSection === "contact" ? "border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </nav>

            {activeSection === "about" && (
              <div className="text-gray-300 space-y-4 animate-fadeIn">
                <p>Full-stack developer with 5+ years of experience specializing in mobile applications and interactive web experiences.</p>
                <p>Passionate about creating intuitive interfaces with cutting-edge technology.</p>
                <a href="/SarhaneGhribi-eng.pdf" className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                  <Download size={18} className="mr-2" /> Download Resume
                </a>
              </div>
            )}

            {activeSection === "skills" && (
              <div className="grid grid-cols-2 gap-4 animate-fadeIn">
                <div className="skill-bar">
                  <div className="flex justify-between mb-1">
                    <span>React/React Native</span>
                    <span>95%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{width: "95%"}}></div>
                  </div>
                </div>
                <div className="skill-bar">
                  <div className="flex justify-between mb-1">
                    <span>Next.js</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{width: "90%"}}></div>
                  </div>
                </div>
                <div className="skill-bar">
                  <div className="flex justify-between mb-1">
                    <span>TypeScript</span>
                    <span>85%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{width: "85%"}}></div>
                  </div>
                </div>
                <div className="skill-bar">
                  <div className="flex justify-between mb-1">
                    <span>Node.js</span>
                    <span>80%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{width: "80%"}}></div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "projects" && (
              <div className="text-gray-300 animate-fadeIn">
                <p className="mb-4">Explore my projects in the interactive phone interface or view the highlights below:</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Code size={16} className="mr-2 text-blue-400" /> AvatarID - Biometric authentication app
                  </li>
                  <li className="flex items-center">
                    <Code size={16} className="mr-2 text-blue-400" /> 3D Space Visualization with Three.js
                  </li>
                  <li className="flex items-center">
                    <Code size={16} className="mr-2 text-blue-400" /> Interactive Document Management System
                  </li>
                </ul>
              </div>
            )}

            {activeSection === "contact" && (
              <div className="text-gray-300 animate-fadeIn">
                <p className="mb-4">Interested in working together? Reach out through any of these channels:</p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Mail size={16} className="mr-2 text-blue-400" /> sarhane.ghribi@gmail.com
                  </li>
                  <li className="flex items-center">
                    <Linkedin size={16} className="mr-2 text-blue-400" /> linkedin.com/in/sarhaneghribi
                  </li>
                  <li className="flex items-center">
                    <Github size={16} className="mr-2 text-blue-400" /> github.com/SarhaneGhribi
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - Project Showcase */}
        <div className="bg-opacity-20 bg-black backdrop-blur-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
          <div className="grid grid-cols-3 gap-6">
            {/* Project Cards */}
            <div className="bg-gray-800 rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-blue-500/20 transition-all">
              <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
<Image src={"/AvatarID.png"} alt={"AvatarID"} width={100} height={100} className={"object-contain"}/>              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">AvatarID App</h3>
                <p className="text-sm text-gray-400">Facial recognition authentication system with liveness detection</p>
                <div className="mt-4 pt-2 border-t border-gray-700">
                  <div className="flex justify-between text-xs">
                    <span>React Native</span>
                    <span>TensorFlow</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-purple-500/20 transition-all">
              <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center rounded-lg">
              <Image src={"/space.jpg"} alt={"Space"} width={100} height={100} className={"object-contain"}/>
             </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">3D Space Explorer</h3>
                <p className="text-sm text-gray-400">Interactive visualization of celestial bodies using Three.js</p>
                <div className="mt-4 pt-2 border-t border-gray-700">
                  <div className="flex justify-between text-xs">
                    <span>Three.js</span>
                    <span>WebGL</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden group hover:shadow-lg hover:shadow-green-500/20 transition-all">
              <div className="h-32 bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center">
                <span className="text-2xl">📂</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-2">Document System</h3>
                <p className="text-sm text-gray-400">Interactive file manager with PDF preview capabilities</p>
                <div className="mt-4 pt-2 border-t border-gray-700">
                  <div className="flex justify-between text-xs">
                    <span>Next.js</span>
                    <span>PDF.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}