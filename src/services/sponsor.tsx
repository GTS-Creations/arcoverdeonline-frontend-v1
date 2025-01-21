import { apiRequestForm } from "@/utils/api";
import { apiRequest } from "@/utils/api";
import Cookies from "js-cookie";

// Rota que cria o patrocinador
export async function createSponsor(formData: FormData) {
  const token = Cookies.get("nextauth.token");

  try {
    // Enviando o FormData diretamente
    const res = await apiRequestForm(`/sponsors`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Não defina o 'Content-Type', o navegador vai lidar com isso
      },
      body: formData, // O corpo da requisição é o FormData
    });

    return res;
  } catch (error: any) {
    console.error("Erro ao criar patrocinador:", error.message);
    throw new Error("Erro ao criar patrocinador. Tente novamente mais tarde.");
  }
}

// Rota que mostra todos os patrocinadores
export async function getAllSponsor(page: number, size: number) {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    const res = await apiRequest(`/sponsors?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    console.error("Erro ao listar patrocinadores.", error.message || error);
    throw new Error(
      "Não foi possível listar os patrocinadores. Tente novamente mais tarde."
    );
  }
}

// Rota que mostra o patrocinador selecionado pelo ID
export async function getSponsorId(id: any) {
  if (!id) {
    throw new Error("O ID do patrocinador é obrigatório.");
  }

  try {
    const res = await apiRequest(`/sponsors/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao buscar patrocinador pelo Id ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível buscar o patrocinador com ID ${id}. Tente novamente mais tarde.`
    );
  }
}

// Rota que faz atualização/edição do patrocinador selecionado pelo ID
export async function updateSponsor(
  id: string, // O ID do patrocinador
  formData: FormData // FormData contendo os dados para atualizar o patrocinador
) {
  if (!id) {
    throw new Error("O ID do patrocinador é obrigatório.");
  }

  const token = Cookies.get("nextauth.token");

  try {
    // Enviando o FormData diretamente
    const res = await apiRequestForm(`/sponsors/${id}`, {
      method: "PUT", // Método para atualizar
      headers: {
        Authorization: `Bearer ${token}`,
        // Não defina o Content-Type, o navegador vai lidar com isso automaticamente
      },
      body: formData, // Corpo da requisição com o FormData
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao atualizar o patrocinador com o ID ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível atualizar o patrocinador com o ID ${id}. Tente novamente mais tarde.`
    );
  }
}

// Rota que deleta o patrocinador selecionado pelo ID
export async function deleteSponsor(id: any): Promise<void> {
  if (!id) {
    throw new Error("O ID do patrocinador é obrigatório.");
  }

  const token = Cookies.get("nextauth.token");

  try {
    await apiRequest(`/sponsors/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error(
      `Erro ao excluir o patrocinador com o ID ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível excluir o patrocinador com o ID ${id}. Tente novamente mais tarde.`
    );
  }
}
