import type { Metadata } from "next";
import type { ReactNode } from "react";
import AuthProvider from "@/app/components/AuthProvider";
import Navbar from "@/app/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Craftara",
  description: "Craft professional business outputs in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#d3d3d3] text-black antialiased">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
