import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ResponsiveNav from "@/components/Navbar/ResponsiveNav";
import Footer from "@/components/Footer/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 300 400 600 700 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 300 400 600 700 900",
});

export const metadata: Metadata = {
  title: "Studiverse - An e-learning app",
  description: "Knowledge at Your Fingertips",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ResponsiveNav /> 
        {children}
        <Footer />
      </body>
    </html>
  );
}
