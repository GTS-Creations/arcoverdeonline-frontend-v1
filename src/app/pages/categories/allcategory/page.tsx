"use client";

import { BsPencil } from "react-icons/bs";
import { Button, Table, HStack, Stack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";

import Link from "next/link";
import { useEffect, useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

import { getAllCategory, deleteCategory } from "@/services/category";

import DialogFormDelete from "@/components/DialogForm/DialogFormDelete";
import ButtonPageAllCreate from "@/components/ButtonCreate/ButtonPageAllCreate";
import { ProgressCircleRing, ProgressCircleRoot } from "@/components/ui/progress-circle";

interface Category {
  id: string;
  name: string;
}

const AllCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const isAuthenticated = useAuthStatus();

  const fetchData = async () => {
    try {
      const categoryData = await getAllCategory(page, 10);
      setCategories(categoryData.content);
      setTotalItems(categoryData.totalElements);
    } catch (error: any) {
      console.error("Erro ao carregar categorias:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId);
      setCategories((prev) =>
        prev.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.log(error);
    }
  };

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

  if (!categories) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-700 text-xl font-semibold">
            Nenhuma categoria encontrada.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <section className="sm:px-5 h-screen pt-10 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-green-700 pb-5">
            Categorias
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
                      Nome
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {categories.map((categ) => (
                    <Table.Row
                      key={categ.id}
                      backgroundColor="transparent"
                      borderBottom="1px solid #ddd"
                    >
                      <Table.Cell
                        color="green.700"
                        className="pr-20 md:pr-56 lg:pr-96"
                      >
                        {categ.name}
                      </Table.Cell>

                      <Table.Cell textAlign="end">
                        <Link
                          href={`/pages/categories/editcategory/${categ.id}`}
                        >
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
                          handleDelete={() => handleDelete(categ.id)}
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
      </section>
    </div>
  );
};

export default AllCategory;
