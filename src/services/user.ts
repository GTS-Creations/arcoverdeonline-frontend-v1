import { apiRequest } from "@/utils/api";
import Cookies from "js-cookie";

// Rota que mostra o usuario selecionada pelo ID
export async function getUserId() {
  const token = Cookies.get("nextauth.token");

  try {
    const res = await apiRequest(`/user/1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao buscar usuário`,
      error.message || error
    );
    throw new Error(
      `Não foi possível buscar o usuário. Tente novamente mais tarde.`
    );
  }
}

// Rota que faz atualização/edição do usuário selecionada pelo ID
export async function updateUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const token = Cookies.get("nextauth.token");

  try {
    const res = await apiRequest(`/user/1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, password }),
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao atualizar o usuário`,
      error.message || error
    );
    throw new Error(
      `Não foi possível atualizar o usuário. Tente novamente mais tarde.`
    );
  }
}
