import { apiRequest } from "@/utils/api";
import Cookies from "js-cookie";
import nookies from 'nookies';

export async function getUserInfo() {
  const token = Cookies.get('nextauth.token');

  try {
    const res = await apiRequest("/session/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!res.ok) {
      throw new Error("Não foi possível obter as informações do usuário");
    }

    const userInfo = await res;
    return userInfo;
  } catch (error: any) {
    console.error(
      "Erro ao obter informações do usuário:",
      error.message || error
    );
    throw error;
  }
}

export const logout = () => {
  nookies.destroy(null, 'nextauth.token', {
    path: '/',
  });

  window.location.href = '/login';
};
