import { apiRequest } from "@/utils/api";
import Cookies from "js-cookie";

// Rota que cria a categoria
export async function createCategory({ name }: { name: string }) {
  const token = Cookies.get("nextauth.token");

  try {
    const res = await apiRequest("/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, subCategories: [] }), // Inclui o array vazio de subcategorias
    });

    return res;
  } catch (error: any) {
    console.error("Erro ao criar categoria:", error.message);
    throw new Error("Erro ao criar categoria. Tente novamente mais tarde.");
  }
}

// Rota que mostra todas as categorias
export async function getAllCategory(page: number, size: number) {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    const res = await apiRequest(`/categories?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    console.error("Erro ao listar categorias:", error.message || error);
    throw new Error(
      "Não foi possível listar as categorias. Tente novamente mais tarde."
    );
  }
}

// Rota que mostra a categoria selecionada pelo ID
export async function getCategoryId(id: any) {
  if (!id) {
    throw new Error("O ID da categoria é obrigatório.");
  }

  try {
    const res = await apiRequest(`/categories/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao buscar categoria pelo Id ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível buscar a categoria com ID ${id}. Tente novamente mais tarde.`
    );
  }
}

// Rota que faz atualização/edição da categoria selecionada pelo ID
export async function updateCategory(
  id: any,
  {
    name,
  }: {
    name: string;
  }
) {
  if (!id) {
    throw new Error("O ID da categoria é obrigatório.");
  }

  const token = Cookies.get("nextauth.token");

  try {
    const res = await apiRequest(`/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    return res;
  } catch (error: any) {
    console.error(
      `Erro ao atualizar a categoria com o ID ${id}:`,
      error.message || error
    );
    throw new Error(
      `Não foi possível atualizar a categoria com o ID ${id}. Tente novamente mais tarde.`
    );
  }
}

// Rota que deleta a categoria selecionada pelo ID
export async function deleteCategory(id: any): Promise<void> {
  if (!id) {
    throw new Error("O ID da categoria é obrigatório.");
  }

  const token = Cookies.get("nextauth.token");

  try {
    await apiRequest(`/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error(
      `Erro ao excluir a categoria com o ID ${id}:`,
      error.message || error
    );
    throw new Error(
      "Não foi possível excluir a categoria. Tente novamente mais tarde."
    );
  }
}
