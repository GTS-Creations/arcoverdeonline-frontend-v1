"use client";

// HOOKS
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// SERVICES
import { getCategoryId, updateCategory } from "@/services/category";

// COMPONENTES
import FormCategory from "@/components/Form/FormCategory";
import DialogFormEdit from "@/components/DialogForm/DialogFormEdit";

export default function EditCategory() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [user, setUser] = useState(false);

  useEffect(() => {
    const cookies = document.cookie
      .split("; ")
      .map((cookie) => cookie.split("="));
    const tokenCookie = cookies.find(([key]) => key === "nextauth.token");

    setUser(!!tokenCookie);
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchCategoryData = async () => {
      try {
        const data = await getCategoryId(id);
        setCategory(data);
        setName(data.name);
      } catch (error: any) {
        setError("Erro ao buscar a categoria, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]);

  const handleEdit = async (e: any) => {
    e.preventDefault();
    try {
      await updateCategory(id, { name });
      window.location.href = "/pages/categories/allcategory";
    } catch (error: any) {
      setError("Erro ao atualizar a categoria, tente novamente mais tarde.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-700 text-xl font-semibold">
          Categoria não encontrada.
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
      <div className="flex items-center pt-10 flex-col h-screen bg-white">
        <form className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          <FormCategory name={name} setName={setName} />

          <DialogFormEdit handleEdit={handleEdit} />
        </form>
      </div>
    </div>
  );
}
