"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetSubCategory } from "@/hooks/useGetSubCategory";
import useAuthStatus from "@/hooks/useAuthStatus";

import { getPostId, updatePost } from "@/services/post";

import FormPost from "@/components/Form/FormPost";
import DialogFormEdit from "@/components/DialogForm/DialogFormEdit";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState<File | any>(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isAuthenticated = useAuthStatus();
  const router = useRouter();

  const { subCategories, subCategoryId, setSubCategoryId, handleChange } =
    useGetSubCategory();

  useEffect(() => {
    if (!id) return;

    const fetchPostData = async () => {
      try {
        const data = await getPostId(id);
        setPost(data);
        setTitle(data.title);
        setSubCategoryId(data.subCategoryId);
        setPdf(data.pdf);
      } catch (err) {
        setError("Erro ao buscar a publicação. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pdf && pdf.type !== "application/pdf") {
      alert("O arquivo deve ser em formato PDF.");
      return;
    }

    if (!title || !subCategoryId) {
      alert("Preencha todos os campos.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", pdf);
    formData.append("subCategoryId", subCategoryId);

    try {
      const res = await updatePost(id, {formData});
      router.push("/allpost");
      return res;
    } catch (err) {
      console.error("Erro ao criar post:", err);
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

  if (!post) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-700 text-xl font-semibold">
            Publicação não encontrada.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-700 text-xl font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <main className="flex items-center flex-col pt-10 h-screen bg-white">
        <form
          className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
          aria-labelledby="edit-post-title"
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

          <DialogFormEdit handleEdit={handleEdit} />
        </form>
      </main>
    </div>
  );
}
