"use client";

import { Suspense } from "react";
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

function SearchContent() {
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
          setResults(data);
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
              <li
                className="w-full flex flex-col hover:scale-95 transition bg-green-700 py-8 rounded-md shadow-sm shadow-gray-400 text-center cursor-pointer"
                key={item.postId}
              >
                {postPdf && (
                  <Button
                    onClick={() => window.open(postPdf, "_blank")}
                    className="flex flex-col"
                    width="full"
                  >
                    <span className="text-xl uppercase underline underline-offset-2 text-white font-semibold">
                      {item.postTitle}
                    </span>
                    <div>
                      <p className="text-md text-gray-100">
                        <span className="font-semibold">Categoria: </span>
                        {item.categoryName}
                      </p>
                      <p className="text-md text-gray-100">
                        <span className="font-semibold">Sub-categoria: </span>
                        {item.subCategoryName}
                      </p>
                    </div>
                  </Button>
                )}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading Search Results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
