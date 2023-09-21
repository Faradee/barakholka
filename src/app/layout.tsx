import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "./redux/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "todo app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ReduxProvider>
          <Navbar />
          <span className="block h-20 w-full" />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
