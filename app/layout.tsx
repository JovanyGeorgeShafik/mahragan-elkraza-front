import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin","arabic"],
});



export const metadata: Metadata = {
  title: "مهرجان الكرازة",
  description: "صوت علي أفضل تصميم",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cairo.variable}  antialiased`}
      >
        <Nav/>
        {children}
      </body>
    </html>
  );
}
