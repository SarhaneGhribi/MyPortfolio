"use client";
import PhoneFrame from "./components/phone/PhoneFrame";
import Image from "next/image";
import "./ink.css";
import Three from "./components/Three";
export default function Home() {
  return (
    // <div className="banner">
    //   <div className="content">
    //     <div className="grid h-screen grid-cols-6">
    //       {/* 1/3 Section */}
    //       <div className="flex justify-center items-center ">
    //         <PhoneFrame />
    //       </div>

    //       {/* 2/3 Section */}
    //       <div className="grid grid-rows-[10fr_8fr] col-span-3">
    //         {/* Top Section (10/18) */}
    //         <div className="grid grid-cols-2">
    //           {/* Left Half */}
    //           <div className="flex justify-center items-center ">
    //             {/* <Image
    //               src={"https://avatars.githubusercontent.com/u/124355119?v=4"}
    //               alt="Profile image"
    //               width={200}
    //               height={200}
    //               className="rounded-full"
    //             /> */}
    //             <h2 style={{ color: "black", fontWeight: "bold" }}>
    //               Full-stack developer
    //             </h2>
    //           </div>
    //           {/* Right Half */}
    //           <div className=""></div>
    //         </div>

    //         {/* Bottom Section (8/18) */}
    //         <div className=""></div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <Three />
  );
}
