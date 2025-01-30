import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script"; // Importação do Script do Next.js

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
        {/* Script de acessibilidade */}
        <Script 
          src="https://website-widgets.pages.dev/dist/sienna.min.js" 
          strategy="beforeInteractive" 
          defer
        />

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