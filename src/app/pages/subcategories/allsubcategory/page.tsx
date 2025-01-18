"use client";

import { BsPencil } from "react-icons/bs";
import { Button, Table } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllSubCategory, deleteSubCategory } from "@/services/subCategory";
import DialogFormDelete from "@/components/DialogForm/DialogFormDelete";
import { useGetCategory } from "@/hooks/useGetCategory";
import ButtonPageAllCreate from "@/components/ButtonCreate/ButtonPageAllCreate";

interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
}

const AllSubCategory = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { categories } = useGetCategory();

  const [user, setUser] = useState(false);

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .map((cookie) => cookie.split("="));
    const tokenCookie = cookies.find(([key]) => key === "nextauth.token");

    setUser(!!tokenCookie);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const subCategoryData = await getAllSubCategory();
        setSubCategories(subCategoryData);
      } catch (error: any) {
        console.error("Erro ao carregar dados:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (subCategoryId: string) => {
    try {
      await deleteSubCategory(subCategoryId);
      setSubCategories((prev) =>
        prev.filter((subCateg) => subCateg.id !== subCategoryId)
      );
    } catch (error: any) {
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  if (!subCategories) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-700 text-xl font-semibold">Sub-categorias não encontradas.</p>
      </div>
    );
  }

  return (
    <div className={user ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="pt-10 sm:px-5 h-screen bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-green-700 pb-5">
            Sub-Categorias
          </h2>

          <div className="pb-5">
            <ButtonPageAllCreate />
          </div>

          <div>
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row
                  backgroundColor="transparent"
                  borderBottom="1px solid #ddd"
                >
                  <Table.ColumnHeader color="green.700">
                    Nome
                  </Table.ColumnHeader>
                  <Table.ColumnHeader color="green.700">
                    Categoria
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {categories.map((category) =>
                  category.subCategories.map((subCateg: any) => (
                    <Table.Row
                      key={subCateg.id}
                      backgroundColor="transparent"
                      borderBottom="1px solid #ddd"
                    >
                      <Table.Cell color="green.700">{subCateg.name}</Table.Cell>
                      <Table.Cell color="green.700">{category.name}</Table.Cell>

                      <Table.Cell>
                        <Link
                          href={`/pages/subcategories/editsubcategory/${subCateg.id}`}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            border="1px solid green"
                            width="full"
                            color="green"
                          >
                            <span className="hidden sm:block">Editar</span>
                            <BsPencil />
                          </Button>
                        </Link>
                      </Table.Cell>

                      <Table.Cell>
                        <DialogFormDelete
                          handleDelete={() => handleDelete(subCateg.id)}
                        >
                          <span className="hidden sm:block">Apagar</span>
                        </DialogFormDelete>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSubCategory;
