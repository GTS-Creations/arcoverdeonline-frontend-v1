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
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";

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
        <div className="flex justify-center flex-col items-center h-screen">
          <ProgressCircleRoot
            value={null}
            size="md"
            colorPalette="green"
            marginBottom="5"
          >
            <ProgressCircleRing cap="round" />
          </ProgressCircleRoot>
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
      <section className="h-screen px-4 pt-10 bg-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center uppercase underline underline-offset-4 text-green-700 pb-6">
            {category.name}
          </h1>

          <h2 className="py-4 text-2xl uppercase font-semibold text-green-700">
            Sub-categorias:
          </h2>
          {category.subCategories.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.subCategories.map((subCategory) => (
                <Link
                  href={`/subcategories/${subCategory.id}`}
                  key={subCategory.id}
                >
                  <div className="hover:scale-105 transition bg-green-700 px-6 py-4 rounded-md shadow-sm shadow-gray-400 text-center cursor-pointer">
                    <span className="uppercase text-white font-semibold">
                      {subCategory.name}
                    </span>
                  </div>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Nenhuma subcategoria encontrada.</p>
          )}

          <Link href={`/`} className="text-center">
            <Button
              backgroundColor="green.700"
              padding="1rem"
              width="full"
              className="mt-6 hover:bg-green-600"
              color="white"
            >
              Voltar
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
