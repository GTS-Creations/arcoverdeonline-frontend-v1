"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/ArcoverdeOnline.png";
import { useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const isAuthenticated = useAuthStatus();

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log("Buscando por:", searchTerm);
    // Lógica para filtrar dados ou chamar uma API.
  };

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml0" : "ml-0"}>
      <nav className="py-4 px-1 sm:px-5 w-full border-b border-green-700 shadow-md bg-green-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <Link href="/">
              <Image
                src={logo}
                alt="Logo Arcoverde Online"
                width={120}
                priority={true}
                className="hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleInputChange}
              className="px-4 py-2 w-40 bg-transparent text-green-800 rounded-lg border border-green-700 focus:ring focus:ring-green-500 focus:outline-none placeholder:text-green-600"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
            >
              Buscar
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
