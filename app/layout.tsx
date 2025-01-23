import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/provider/appkit-provider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ArvynFI",
  description:
    "ArvynFi Telegram bot lets you swap tokens, send/receive SOL, and manage your wallet on Solana directly from Telegram.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased bg-white dark:text-white min-h-screen flex flex-col justify-between dark:bg-slate-900`}
      >
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
