import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import BackgroundAnimation from "@/components/BackgroundAnimation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Premium Developer Portfolio",
  description: "A modern developer portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <BackgroundAnimation />
        <Preloader />
        <ScrollProgress />
        <CustomCursor />
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          <SmoothScrollProvider>
            <div className="relative z-10 flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </div>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
