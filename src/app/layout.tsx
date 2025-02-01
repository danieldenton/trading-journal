import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TradeContextProvider from "./context/trade";
import TriggerContextProvider from "./context/trigger";
import SetupContextProvider from "./context/setup";
import UserContextProvider from "./context/user";
import Navbar from "./components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trading Journal",
  description: "Journal for trading ICT concepts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserContextProvider>
          <TriggerContextProvider>
            <SetupContextProvider>
              <TradeContextProvider>
                <Navbar />
                {children}
              </TradeContextProvider>
            </SetupContextProvider>
          </TriggerContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
