import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "./redux/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Барахолка",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className}`}>
        <ReduxProvider>
          <Navbar />
          <div className="mx-auto items-center lg:mx-64 ">{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
