"use client";

// CHAKRA UI
import { Stack } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";

// SERVICES
import { createPost } from "@/services/post";

// HOOKS
import { useState } from "react";
import { useGetSubCategory } from "@/hooks/useGetSubCategory";
import useAuthStatus from "@/hooks/useAuthStatus";

// COMPONENTES
import FormPost from "@/components/Form/FormPost";
import ButtonFormCreate from "@/components/ButtonCreate/ButtonFormCreate";

export default function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const [pdf, setPdf] = useState<File | any>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const isAuthenticated = useAuthStatus();

  const { subCategories, subCategoryId, setSubCategoryId, handleChange } =
    useGetSubCategory();

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdf(file);
    } else {
      setError(true);
      alert("Por favor, selecione um arquivo PDF.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    if (!title || !pdf || !subCategoryId) {
      setError(true);
      return;
    }

    if (pdf && pdf.type !== "application/pdf") {
      setError(true);
      alert("O arquivo deve ser um PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", pdf);
    formData.append("subCategoryId", subCategoryId);

    try {
      const res = await createPost(formData);
      setSuccess(true);
      return res;
    } catch (err) {
      console.error("Erro ao criar post:", err);
      setError(true);
    } finally {
      setTitle("");
      setPdf(null);
      setSubCategoryId("");
    }
  };

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="flex items-center flex-col bg-white pt-10 h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
        >
          <FormPost
            handleChange={handleChange}
            title={title}
            setTitle={setTitle}
            pdf={pdf}
            setPdf={setPdf}
            subCategoryId={subCategoryId}
            subCategories={subCategories}
          />

          <ButtonFormCreate />

          <Stack marginTop="1rem">
            {success && (
              <Alert status="success" title="Publicação criada com sucesso!" />
            )}
            {error && (
              <Alert
                status="error"
                title="Erro ao criar publicação. Tente novamente."
              />
            )}
          </Stack>
        </form>
      </div>
    </div>
  );
}
