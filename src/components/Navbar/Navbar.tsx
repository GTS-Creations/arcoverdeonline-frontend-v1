"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/ArcoverdeOnline.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStatus from "@/hooks/useAuthStatus";
import { IoSearchCircleOutline } from "react-icons/io5";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const isAuthenticated = useAuthStatus();
  const router = useRouter();

  const handleInputChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/search?searchTerm=${encodeURIComponent(searchTerm)}`);
    }
    setSearchTerm("");
  };

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml0" : "ml-0"}>
      <nav className="py-4 px-1 sm:px-5 w-full border-b border-green-900 shadow-md bg-green-50">
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
              className="px-4 py-2 w-40 md:w-60 bg-transparent text-green-900 rounded-lg border-2 border-green-700 focus:ring focus:border focus:ring-green-700 focus:outline-none placeholder:text-green-700"
            />
            <button
              onClick={handleSearch}
              className="bg-green-700 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
            >
              <IoSearchCircleOutline size="40"/>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
