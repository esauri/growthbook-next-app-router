import React, { ReactNode } from "react";
import { inter } from "@/helpers/fonts";
import "@/styles/globals.css";

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
