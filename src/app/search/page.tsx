"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { search } from "@/services/home";
import useAuthStatus from "@/hooks/useAuthStatus";
import { Button } from "@chakra-ui/react";
import { getAllPost } from "@/services/post";

import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";

interface Post {
  id: number;
  pdf: string;
  title: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const isAuthenticated = useAuthStatus();

  useEffect(() => {
    if (searchTerm) {
      const fetchResults = async () => {
        try {
          const data = await search({ query: searchTerm });
          setResults(data); // Agora só contém os posts
        } catch (error) {
          setError("Erro ao carregar os dados. Tente novamente mais tarde.");
          console.error("Erro ao buscar:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await getAllPost(0, 1000000000000000);
        setPosts(postData.content);
      } catch (error: any) {
        console.error("Erro ao carregar dados:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center flex-col items-center h-screen">
          <ProgressCircleRoot value={null} size="md" colorPalette="green" marginBottom="5">
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

  if (!results) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-600 text-xl font-semibold">
            Publicação não encontrada.
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
            Resultados para: "{searchTerm}"
          </h1>
          {results.map((item: any) => {
            const matchedPost = posts.find(
              (post: any) => post.id === item.postId
            );
            const postPdf = matchedPost?.pdf || null;

            return (
              <li key={item.postId} className="list-none border-b-2 border-gray-400 p-4 flex flex-col justify-center items-center">
                {postPdf && (
                  <Button
                    padding="1rem"
                    color="green.800"
                    textDecoration="underline"
                    onClick={() => window.open(postPdf, "_blank")}
                  >
                    <span className="text-3xl mb-4">{item.postTitle}</span>
                  </Button>
                )}
                <p className="text-sm text-gray-600">
                  Categoria: {item.categoryName}
                </p>
                <p className="text-sm text-gray-600">
                  Sub-categoria: {item.subCategoryName}
                </p>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
}
