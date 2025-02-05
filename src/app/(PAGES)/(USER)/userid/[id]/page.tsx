"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getUserId } from "@/services/user";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import useAuthStatus from "@/hooks/useAuthStatus";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";

interface User {
  name: string;
  email: string;
}

const UserId = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useAuthStatus();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserId(id);
        setUser(res);
      } catch (err) {
        console.error(err);
        setError("Erro ao procurar usuário, tente novamente mais tarde.");
      }
    };

    fetchUser();
  }, []);

  return (
    <main className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <section className="min-h-screen px-4 flex justify-center bg-white pb-16">
        <article className="bg-white p-8 max-w-md w-full">
          {error ? (
            <p className="text-red-600 text-center font-semibold">{error}</p>
          ) : !user ? (
            <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
              <div className="flex justify-center flex-col items-center h-screen">
                <ProgressCircleRoot
                  value={null}
                  size="md"
                  colorPalette="green"
                  marginBottom="5"
                >
                  <ProgressCircleRing cap="round" />
                </ProgressCircleRoot>
                <p className="text-green-700 text-xl font-semibold">
                  Carregando...
                </p>
              </div>
            </div>
          ) : (
            <section className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Nome: {user.name}
              </h1>
              <p className="text-gray-600 pb-10">Email: {user.email}</p>

              <Link href="/edituser/1">
                <Button
                  type="submit"
                  width="full"
                  variant="solid"
                  colorScheme="green"
                  className="transition-all hover:opacity-80"
                  color="white"
                  backgroundColor="green.700"
                >
                  Editar Usuário
                </Button>
              </Link>
            </section>
          )}
        </article>
      </section>
    </main>
  );
};

export default UserId;
