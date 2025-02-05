"use client";

// CHAKRA UI
import { Stack } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";

// SERVICES
import { createSubCategory } from "@/services/subCategory";

// HOOKS
import { useState } from "react";
import { useGetCategory } from "@/hooks/useGetCategory";
import useAuthStatus from "@/hooks/useAuthStatus";

// COMPONENTES
import FormSubCategory from "@/components/Form/FormSubCategory";
import ButtonFormCreate from "@/components/ButtonCreate/ButtonFormCreate";

export default function CreateSubCategory() {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const isAuthenticated = useAuthStatus();

  const { categories, categoryId, setCategoryId, handleChange } =
    useGetCategory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    try {
      const newSubCategory = await createSubCategory({
        name,
        categoryId,
      });

      setSuccess(true);
      setName("");
      setCategoryId("");
      return newSubCategory;
    } catch (err) {
      console.error("Erro ao criar subcategoria:", err);
      setError(true);
    }
  };

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <main
        className="flex items-center h-screen flex-col bg-white pt-10"
        aria-labelledby="sub-category-title"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
        >
          <FormSubCategory
            handleChange={handleChange}
            name={name}
            setName={setName}
            categoryId={categoryId}
            categories={categories}
          />

          <ButtonFormCreate />

          <Stack marginTop="1rem">
            {success && (
              <Alert
                status="success"
                title="Sub-categoria criada com sucesso!"
              />
            )}
            {error && (
              <Alert status="error" title="Erro ao criar sub-categoria" />
            )}
          </Stack>
        </form>
      </main>
    </div>
  );
}
