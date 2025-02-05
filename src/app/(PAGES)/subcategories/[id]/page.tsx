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
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";

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

  // Exibe erro
  if (error) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-600 text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  // Exibe mensagem caso a subcategoria não seja encontrada
  if (!subCategory) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-600 text-xl font-semibold">
            Sub-categoria não encontrada.
          </p>
        </div>
      </div>
    );
  }

  // Renderiza a página
  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <main className="h-screen px-4 pt-10 bg-white">
        <div className="max-w-5xl mx-auto">
          {/* Cabeçalho da Subcategoria */}
          <header className="text-center">
            <h1 className="text-4xl font-bold uppercase underline underline-offset-4 text-green-700 pb-6">
              {subCategory.name}
            </h1>
          </header>

          {/* Seção de Publicações */}
          <section>
            <h2 className="py-4 text-2xl font-semibold uppercase text-green-700">
              Publicações:
            </h2>

            {subCategory.posts.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subCategory.posts.map((post) => (
                  <li key={post.id}>
                    <button
                      className="w-full hover:scale-105 bg-green-700 transition px-6 py-4 rounded-md shadow-sm shadow-gray-400 text-center cursor-pointer"
                      onClick={() => {
                        if (post.pdf) {
                          window.open(post.pdf, "_blank"); // Abre o PDF em uma nova aba
                        } else {
                          alert("PDF não disponível."); // Exibe alerta caso o PDF não esteja disponível
                        }
                      }}
                    >
                      <span className="uppercase text-white font-semibold">
                        {post.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Nenhuma publicação encontrada.</p>
            )}
          </section>

          {/* Rodapé com Botão de Voltar */}
          <footer className="text-center mt-6">
            <Link href={`/`}>
              <Button
                backgroundColor="green.700"
                padding="1rem"
                width="full"
                className="hover:bg-green-600"
                color="white"
              >
                Voltar
              </Button>
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}
