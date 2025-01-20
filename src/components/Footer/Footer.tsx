"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

import Image from "next/image";
import logoGTS from "@/assets/images/logoGTS.png";

export default function Footer() {
  const isAuthenticated = useAuthStatus();

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml0" : "ml-0"}>
      <footer className="pt-8 pb-4 bg-green-50 text-green-800 border-t-2 border-green-700">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-start gap-8 px-4 pb-8">

          <div className="flex-1 min-w-[200px]">
            <h2 className="text-lg font-semibold mb-4">Links Rápidos</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-green-600 transition">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/About"
                  className="hover:text-green-600 transition"
                >
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-1 min-w-[200px]">
            <h2 className="text-lg font-semibold mb-4">Contato</h2>
            <p className="mb-2">
              <span className="font-medium">Email:</span> exemplo@exemplo.com
            </p>
            <p>
              <span className="font-medium">Telefone:</span> (00) 90000-0000
            </p>
          </div>
        </div>

        <div className="text-center flex flex-col justify-center items-center bg-green-50">
          <div className="bg-green-600 w-11/12 pt-px"></div>
          <div className="flex items-center pt-2 gap-2">
            <Link href="https://www.instagram.com/gtscreationsofc?igsh=MTA1cjZhem9wMjdmcQ==" target="_blank">
              <Image
                src={logoGTS}
                alt="Logo GTS Creations"
                width={100}
                priority={true}
              />
            </Link>
            <p className="text-sm font-medium">
              &copy; {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
