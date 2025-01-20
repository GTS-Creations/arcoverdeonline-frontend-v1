"use client";

import { useState, useEffect } from "react";
import { getUserId } from "@/services/user";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import useAuthStatus from "@/hooks/useAuthStatus";

interface User {
  name: string;
  email: string;
}

const UserId = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useAuthStatus();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserId();
        setUser(res);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data.");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="min-h-screen px-4 flex justify-center bg-white pb-16">
        <div className="bg-white p-8 max-w-md w-full">
          {error ? (
            <div className="text-red-600 text-center font-semibold">
              {error}
            </div>
          ) : !user ? (
            <div className="flex justify-center items-center h-screen">
              <p className="text-green-700 text-xl font-semibold">
                Carregando...
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Nome: {user.name}
              </h1>
              <p className="text-gray-600 pb-10">Email: {user.email}</p>

              <Link href="/pages/users/edituser/1">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserId;
