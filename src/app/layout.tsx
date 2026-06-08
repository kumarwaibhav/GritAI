import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grit AI - Cram Smarter. Ace Everything.",
  description: "AI-powered lecture notes, quizzes, and cheat sheets. Record or upload your lecture and get study materials instantly.",
  keywords: ["AI notes", "lecture summarizer", "study tools", "quiz generator", "cheat sheet"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className={dmSans.className}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgb(17, 17, 21)",
              border: "1px solid rgb(40, 40, 54)",
              color: "rgb(240, 237, 232)",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
