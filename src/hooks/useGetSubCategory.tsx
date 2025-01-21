import { useState, useEffect } from "react";
import { getAllSubCategory } from "@/services/subCategory";

interface Post {
  id: string;
  title: string;
  pdfUrl: string;
}

interface SubCategory {
  id: string;
  name: string;
  posts: Post[];
}

export const useGetSubCategory = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [subCategoryId, setSubCategoryId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Função para buscar as subcategorias
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const data = await getAllSubCategory(0, 1000);
        setSubCategories(data.content);
      } catch (error: any) {
        console.error("Erro ao carregar sub-categorias:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, []);

  // Atualiza o estado com a subcategoria selecionada
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value; // Obtem o ID diretamente
    setSubCategoryId(selectedId);
  };

  return {
    subCategories,
    subCategoryId,
    setSubCategoryId,
    handleChange,
    loading,
  };
};
