import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/base/Nav";
import Footer from "@/components/base/Footer";
import { ToastProvider } from "@/components/Toast/ToastContext";
import { AccountProvider } from "@/components/Account/AccountContext";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastProvider>
          <AccountProvider>
            <Nav />
            {children}
            <Footer />
          </AccountProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
