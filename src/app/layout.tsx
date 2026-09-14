import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Sarhane Ghribi — React Native Developer",
  description:
    "Self-taught React Native developer building mobile products end-to-end, from idea to the App Store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${roboto.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
