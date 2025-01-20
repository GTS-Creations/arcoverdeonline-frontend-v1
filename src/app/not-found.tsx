'use client'

import { Button } from "@chakra-ui/react";
import Link from "next/link";
import useAuthStatus from "@/hooks/useAuthStatus";

const notfound = () => {
  const isAuthenticated = useAuthStatus();
  
  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="h-screen px-4 bg-white">
        <div className="text-center space-y-5">
          <h1 className="pt-10 text-3xl">Página não encontrada.</h1>
          <p className="pb-10">A página que você procura não existe.</p>

          <Link href="/">
            <Button
              size="sm"
              type="submit"
              alignSelf="flex-start"
              width="48%"
              variant="solid"
              color="green"
              border="1px solid green"
            >
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default notfound;
