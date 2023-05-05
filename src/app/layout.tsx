import { Inter } from "next/font/google";
import React, { ReactNode } from "react";
import GrowthbookProvider from "../components/GrowthbookProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GrowthBook Next App Router Example",
  description: "Next App Router using GrowthBook",
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* @ts-expect-error Async Server Component */}
        <GrowthbookProvider>{children}</GrowthbookProvider>
      </body>
    </html>
  );
}
