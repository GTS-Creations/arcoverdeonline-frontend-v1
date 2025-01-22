"use client";

// CHAKRA UI
import { Button } from "@chakra-ui/react";

// HOOKS
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

// SERVICES
import { getCategoryId } from "@/services/category";

interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

interface SubCategory {
  id: string;
  name: string;
}

export default function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useAuthStatus();

  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      try {
        setLoading(true);

        const categoryData = await getCategoryId(id);

        if (!categoryData) {
          setError("Categoria não encontrada.");
          return;
        }

        setCategory(categoryData);
      } catch (err: any) {
        setError("Erro ao carregar os dados. Tente novamente mais tarde.");
        console.error("Erro ao buscar a categoria:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-green-700 text-xl font-semibold">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-600 text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-600 text-xl font-semibold">
            Categoria não encontrada.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="h-screen px-4 pt-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-green-700 pb-6">
            {category.name}
          </h1>

          <h2 className="py-4 text-2xl font-semibold text-green-700">
            Subcategorias:
          </h2>
          {category.subCategories.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.subCategories.map((subCategory) => (
                <li key={subCategory.id}>
                  <Link
                    href={`/pages/subcategories/subcategoryid/${subCategory.id}`}
                  >
                    <Button
                      borderBottom="1px solid green"
                      padding="1rem"
                      width="full"
                      className="w-full bg-white text-green-700 font-semibold rounded-none shadow-lg hover:bg-green-700 hover:text-white transition hover:rounded-md"
                    >
                      {subCategory.name}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Nenhuma subcategoria encontrada.</p>
          )}

          <Link href={`/`}>
            <Button
              backgroundColor="green.700"
              padding="1rem"
              width="4/12"
              className="mt-6 hover:bg-green-500 transition-colors"
              color="white"
            >
              Voltar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
