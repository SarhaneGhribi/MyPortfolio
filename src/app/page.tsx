"use client";
import PhoneFrame from "./components/phone/PhoneFrame";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="object-left justify-center items-center">
        <PhoneFrame />
      </div>
    </div>
  );
}
