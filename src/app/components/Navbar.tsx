// "use client";
// import Link from "next/link";
// import { useState } from "react";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isToggeled, setIsToggeled] = useState(false);
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     setIsToggeled(!isToggeled);
//   };

//   return (
//     <nav className="bg-transparent fixed w-full py-4">
//       <div className="container mx-auto flex justify-between items-center px-4">
//         <div className="flex items-center">
//           <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
//             <div className="w-6 h-0.5 bg-white mb-1"></div>
//             <div className="w-6 h-0.5 bg-white mb-1"></div>
//             <div className="w-6 h-0.5 bg-white"></div>
//           </button>
//           <ul
//             className={`flex flex-col md:flex-row md:space-x-20 space-y-4 md:space-y-0 ${
//               isMenuOpen ? "block" : "hidden"
//             } md:block`}
//           >
//             <li>
//               <Link href="/" legacyBehavior>
//                 <a className="text-white text-xl md:text-lg hover:text-2xl font-bold transition-all duration-200">
//                   Home
//                 </a>
//               </Link>
//             </li>
//             <li>
//               <Link href="/about" legacyBehavior>
//                 <a className="text-white text-xl md:text-lg hover:text-2xl font-bold transition-all duration-200">
//                   About
//                 </a>
//               </Link>
//             </li>
//             <li>
//               <Link href="/services" legacyBehavior>
//                 <a className="text-white text-xl md:text-lg hover:text-2xl font-bold transition-all duration-200">
//                   Services
//                 </a>
//               </Link>
//             </li>
//             <li>
//               <Link href="/contact" legacyBehavior>
//                 <a className="text-white text-xl md:text-lg hover:text-2xl font-bold transition-all duration-200">
//                   Contact
//                 </a>
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
