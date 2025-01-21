"use client";

import { BsPencil } from "react-icons/bs";
import { Button, HStack, Stack, Table } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";

import Link from "next/link";
import { useEffect, useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

import { getAllPost, deletePost } from "@/services/post";
import { getAllSubCategory } from "@/services/subCategory";

import DialogFormDelete from "@/components/DialogForm/DialogFormDelete";
import ButtonPageAllCreate from "@/components/ButtonCreate/ButtonPageAllCreate";

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

const AllPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAuthStatus();

  const fetchData = async () => {
    try {
      const postData = await getAllPost(page, 10);
      setPosts(postData.content);

      const subCategoryData = await getAllSubCategory(0, 1000000000000000);
      setSubCategories(subCategoryData.content);

      setTotalItems(postData.totalElements);
    } catch (error: any) {
      console.error("Erro ao carregar dados:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (error: any) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  if (!posts) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-700 text-xl font-semibold">
          Nenhuma publicação encontrada.
        </p>
      </div>
    );
  }

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="pt-10 sm:px-5 h-screen bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-green-700 pb-5">
            Publicações
          </h2>

          <div className="pb-5">
            <ButtonPageAllCreate />
          </div>

          <div>
            <Stack width="full" gap="5">
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row
                    backgroundColor="transparent"
                    borderBottom="1px solid #ddd"
                  >
                    <Table.ColumnHeader color="green.700" fontWeight="700">
                      Título
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="green.700" fontWeight="700">
                      PDF
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="green.700" fontWeight="700">
                      Sub-Categoria
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {posts.map((post) => (
                    <Table.Row
                      key={post.id}
                      backgroundColor="transparent"
                      borderBottom="1px solid #ddd"
                    >
                      <Table.Cell color="green.700">{post.title}</Table.Cell>

                      <Table.Cell color="green.700" className="break-all">
                        {post.pdf}
                      </Table.Cell>

                      <Table.Cell
                        color="green.700"
                        className="pr-10 md:pr-80 lg:pr-96"
                      >
                        {
                          subCategories.find((subCat) =>
                            subCat.posts.some(
                              (subCateg) => subCateg.id === post.id
                            )
                          )?.name
                        }
                      </Table.Cell>

                      <Table.Cell textAlign="end">
                        <Link href={`/pages/posts/editpost/${post.id}`}>
                          <Button
                            variant="solid"
                            size="sm"
                            padding="1rem"
                            backgroundColor="green.700"
                            color="white"
                          >
                            <span className="hidden sm:block">Editar</span>
                            <BsPencil />
                          </Button>
                        </Link>
                      </Table.Cell>

                      <Table.Cell textAlign="end">
                        <DialogFormDelete
                          handleDelete={() => handleDelete(post.id)}
                        >
                          <span className="hidden sm:block">Apagar</span>
                        </DialogFormDelete>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>

              <PaginationRoot
                count={totalItems}
                pageSize={10}
                page={page + 1}
                onPageChange={(e) => setPage(e.page - 1)}
                color="white"
                backgroundColor="green.700"
              >
                <HStack wrap="wrap">
                  <PaginationPrevTrigger />
                  <PaginationItems className="hover:border-white hover:border focus:border focus:border-white" />
                  <PaginationNextTrigger />
                </HStack>
              </PaginationRoot>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPost;
