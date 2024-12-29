"use client";

// CHAKRA UI
import { Stack } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";

// SERVICES
import { createCategory } from "@/services/category";

// HOOKS
import { useState } from "react";

// COMPONENTES
import FormCategory from "@/components/Form/FormCategory";
import ButtonFormCreate from "@/components/ButtonCreate/ButtonFormCreate";

export default function CreateCategory() {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    const newCategory = async () => {
      try {
        const res = await createCategory({
          name,
        });

        setSuccess(true);
        return res;
      } catch (error) {
        setError(true);
      }
    };

    newCategory();
    setName("");
  };

  return (
    <div className="flex items-center justify-center flex-col bg-white py-40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
      >
        <FormCategory name={name} setName={setName} />

        <ButtonFormCreate/>

        <Stack marginTop="1rem">
          {success && (
            <Alert status="success" title="Categoria criada com sucesso!" />
          )}
          {error && <Alert status="error" title="Erro ao criar categoria" />}
        </Stack>
      </form>
    </div>
  );
}
