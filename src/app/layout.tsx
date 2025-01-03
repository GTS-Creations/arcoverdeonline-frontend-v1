import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/Siderbar/Siderbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Arcoverde Online",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const user = true;

  return (
    <html lang="pt-br" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
      >
        <Provider>
          <aside className={user ? "block" : "hidden"}>
            <Sidebar />
          </aside>
          <header className={user ? "lg:ml-56 sm:ml0" : "ml-0"}>
            <Navbar />
          </header>

          <main className={user ? "lg:ml-56 sm:ml0" : "ml-0"}>{children}</main>

          <footer className={user ? "lg:ml-56 sm:ml0" : "ml-0"}>
            <Footer />
          </footer>
        </Provider>
      </body>
    </html>
  );
}
