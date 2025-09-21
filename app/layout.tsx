import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/components/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

export const brockmann = localFont({
  src: [
    {
      path: "../assets/fonts/brockmann-medium-webfont.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/brockmann-medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-brockmann",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${brockmann.variable} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
