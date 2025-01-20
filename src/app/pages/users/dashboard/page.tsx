"use client";

import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth";
import useAuthStatus from "@/hooks/useAuthStatus";

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAuthStatus();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getUserInfo();
        setUserInfo(res);
      } catch (error) {
        console.error("Erro ao carregar informações do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!isAuthenticated) {
    return <p>Erro ao carregar informações do usuário</p>;
  }

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <h1>Bem-vindo, {userInfo}!</h1>
    </div>
  );
}
