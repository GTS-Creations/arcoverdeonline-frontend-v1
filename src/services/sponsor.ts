import { apiRequestForm } from "@/utils/api";
import { apiRequest } from "@/utils/api";
import Cookies from "js-cookie";

// Rota que cria o patrocinador
export async function createSponsor(formData: FormData) {
  const token = Cookies.get("nextauth.token");

  try {
    const res = await apiRequestForm(`/sponsors`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
    console.error(`Erro ao buscar patrocinador ${id}:`, error.message || error);
    throw new Error(
      `Não foi possível buscar o patrocinador ${id}. Tente novamente mais tarde.`
    );
  }
}

export async function updateSponsor(
  id: any,
  { formData }: { formData: FormData }
) {
  if (!id) {
    throw new Error("O ID do patrocinador é obrigatório.");
  }

  const token = Cookies.get("nextauth.token");

  try {
    const res = await apiRequestForm(`/sponsors/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao atualizar o patrocinador ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível atualizar o patrocinador ${id}. Tente novamente mais tarde.`
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
      `Erro ao excluir o patrocinador ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível excluir o patrocinador ${id}. Tente novamente mais tarde.`
    );
  }
}
