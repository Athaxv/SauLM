import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import Provider from "@/components/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "",
  description: "",
};

export const brockmann = localFont({
  src: [
    {
      path: "../public/fonts/brockmann-medium-webfont.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/brockmann-medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-brockmann",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${brockmann.variable} ${inter.variable} ${playfairDisplay.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Provider>
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
