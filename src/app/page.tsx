import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      {" "}
      <Image
        src={"https://avatars.githubusercontent.com/u/124355119?v=4"}
        alt="Profile image"
        width={200}
        height={200}
        className="rounded-full"
      />
    </div>
  );
}
