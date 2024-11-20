"use client";
import PhoneFrame from "./components/phone/PhoneFrame";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid h-screen grid-cols-3">
      {/* 1/3 Section */}
      <div className="flex justify-center items-center bg-gray-100">
        <PhoneFrame />
      </div>

      {/* 2/3 Section */}
      <div className="grid grid-rows-[10fr_8fr] col-span-2">
        {/* Top Section (10/18) */}
        <div className="grid grid-cols-2">
          {/* Left Half */}
          <div className="flex justify-center items-center bg-gray-200">
            <Image
              src={"https://avatars.githubusercontent.com/u/124355119?v=4"}
              alt="Profile image"
              width={200}
              height={200}
              className="rounded-full"
            />
            <h2 style={{ color: "black", fontWeight: "bold" }}>
              Full-stack developer
            </h2>
          </div>
          {/* Right Half */}
          <div className="bg-gray-300"></div>
        </div>

        {/* Bottom Section (8/18) */}
        <div className="bg-gray-400"></div>
      </div>
    </div>
  );
}
