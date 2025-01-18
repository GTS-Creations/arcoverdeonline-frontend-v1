import "./globals.css";

import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import { AuthProvider } from "@/contexts/AuthContext";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/Siderbar/Siderbar";

export const metadata: Metadata = {
  title: "Arcoverde Online",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning={true}>
      <body className={`antialiased flex flex-col`}>
        <AuthProvider>
          <Provider>
            <aside>
              <Sidebar />
            </aside>
            <header>
              <Navbar />
            </header>

            <main>{children}</main>

            <footer>
              <Footer />
            </footer>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
