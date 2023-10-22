import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReduxProvider } from "./redux/provider";
import NextTopLoader from "nextjs-toploader";
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
          <NextTopLoader color="#f72d2d" showSpinner={false} />
          <div className="relative md:px-16 lg:px-32 xl:px-64">{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
