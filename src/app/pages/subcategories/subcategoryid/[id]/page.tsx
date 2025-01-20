"use client";

// CHAKRA UI
import { Button } from "@chakra-ui/react";

// HOOKS
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

// SERVICES
import { getSubCategoryId } from "@/services/subCategory";

interface Post {
  id: string;
  title: string;
  pdf: string;
}

interface SubCategory {
  id: string;
  name: string;
  posts: Post[];
}

export default function SubCategoryDetails() {
  const { id } = useParams(); // Obtém o ID da subcategoria pela URL
  const [subCategory, setSubCategory] = useState<SubCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useAuthStatus();

  // Carrega a subcategoria e publicações
  useEffect(() => {
    if (!id) return;

    const fetchSubCategory = async () => {
      try {
        setLoading(true);

        const subCategoryData = await getSubCategoryId(id);

        if (!subCategoryData) {
          setError("Sub-categoria não encontrada.");
          return;
        }

        setSubCategory(subCategoryData);
      } catch (err: any) {
        setError("Erro ao carregar os dados. Tente novamente mais tarde.");
        console.error("Erro ao buscar a subcategoria:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategory();
  }, [id]);

  // Exibe carregamento
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  // Exibe erro
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  // Exibe mensagem caso a subcategoria não seja encontrada
  if (!subCategory) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-xl font-semibold">
          Sub-categoria não encontrada.
        </p>
      </div>
    );
  }

  // Renderiza a página
  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="px-4 bg-white pt-10 h-screen">
        <div className="max-w-5xl mx-auto">
          {/* Título da subcategoria */}
          <h1 className="text-4xl font-bold text-center text-green-700 pb-6">
            {subCategory.name}
          </h1>

          {/* Lista de publicações */}
          <h2 className="py-4 text-2xl font-semibold text-green-700">
            Publicações:
          </h2>
          {subCategory.posts.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subCategory.posts.map((post) => (
                <li key={post.id}>
                  <Button
                    borderBottom="1px solid green"
                    padding="1rem"
                    width="full"
                    className="w-full bg-white text-green-700 font-semibold rounded-none shadow-lg hover:bg-green-700 hover:text-white transition hover:rounded-md"
                    onClick={() => {
                      if (post.pdf) {
                        window.open(post.pdf, "_blank"); // Abre o PDF em uma nova guia
                      } else {
                        alert("PDF não disponível."); // Exibe alerta caso o PDF não esteja disponível
                      }
                    }}
                  >
                    {post.title}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Nenhuma publicação encontrada.</p>
          )}

          {/* Botão de voltar */}
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
