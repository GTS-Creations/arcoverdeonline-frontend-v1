"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPostId, updatePost } from "@/services/post";
import { useGetSubCategory } from "@/hooks/useGetSubCategory";
import FormPost from "@/components/Form/FormPost";
import DialogFormEdit from "@/components/DialogForm/DialogFormEdit";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState<File | null>(null); // Alterado para aceitar `null`

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [user, setUser] = useState(false);

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .map((cookie) => cookie.split("="));
    const tokenCookie = cookies.find(([key]) => key === "nextauth.token");

    setUser(!!tokenCookie);
  }, []);

  const { subCategories, subCategoryId, setSubCategoryId, handleChange } =
    useGetSubCategory();

  useEffect(() => {
    if (!id) return;

    const fetchPostData = async () => {
      try {
        const data = await getPostId(id);
        setPost(data);
        setTitle(data.title || "");
        setSubCategoryId(data.subCategoryId || "");
        if (data.pdf) {
          setPdf(null); // Consistência inicial
        }
      } catch (err) {
        setError("Erro ao buscar a publicação. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  const handleEdit = async () => {
    try {
      await updatePost(id, { title, pdf, subCategoryId });
      window.location.href = "/pages/posts/allpost";
    } catch {
      setError("Erro ao atualizar a publicação. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-700 text-xl font-semibold">
          Publicação não encontrada.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-700 text-xl font-semibold">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className={user ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="flex items-center flex-col pt-10 h-screen bg-white">
        <form className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
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
      </div>
    </div>
  );
}
