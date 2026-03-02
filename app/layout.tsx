import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/I18nContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AstroAI - Discover Your Cosmic Blueprint",
  description: "AI-powered astrology platform with natal chart calculation, geodetic astrology, and personalized readings. Not fortune telling — it's about purpose.",
  keywords: ["astrology", "natal chart", "horoscope", "birth chart", "geodetic astrology", "AI astrology"],
  authors: [{ name: "AstroAI" }],
  openGraph: {
    title: "AstroAI - Discover Your Cosmic Blueprint",
    description: "Complete natal chart analysis with geodetic astrology. Data-driven insights, not fortune telling.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased min-h-screen`}>
        <I18nProvider>
          <div className="relative min-h-screen flex flex-col">
            {/* Background Stars */}
            <StarField />
            
            {/* Navigation */}
            <Navbar />
            
            {/* Main Content */}
            <main className="flex-1 relative z-10">
              {children}
            </main>
            
            {/* Footer */}
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}

// Star Field Background Component
function StarField() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large stars */}
      <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-star-100 rounded-full animate-twinkle" style={{ animationDelay: '0s' }} />
      <div className="absolute top-[25%] left-[75%] w-1.5 h-1.5 bg-star-200 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[60%] left-[20%] w-1 h-1 bg-star-300 rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[80%] left-[60%] w-1 h-1 bg-star-100 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-[40%] left-[85%] w-1.5 h-1.5 bg-star-200 rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-[15%] left-[45%] w-1 h-1 bg-star-300 rounded-full animate-twinkle" style={{ animationDelay: '2.5s' }} />
      
      {/* Small stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white/40 rounded-full animate-twinkle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
      
      {/* Constellation lines - subtle */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <line x1="15%" y1="10%" x2="25%" y2="25%" stroke="currentColor" strokeWidth="0.5" className="text-star-300" />
        <line x1="25%" y1="25%" x2="20%" y2="60%" stroke="currentColor" strokeWidth="0.5" className="text-star-300" />
        <line x1="75%" y1="25%" x2="85%" y2="40%" stroke="currentColor" strokeWidth="0.5" className="text-star-300" />
        <line x1="60%" y1="80%" x2="75%" y2="85%" stroke="currentColor" strokeWidth="0.5" className="text-star-300" />
      </svg>
    </div>
  );
}
