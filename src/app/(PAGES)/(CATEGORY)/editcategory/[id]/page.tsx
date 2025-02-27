"use client";

// HOOKS
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

// SERVICES
import { getCategoryId, updateCategory } from "@/services/category";

// COMPONENTES
import FormCategory from "@/components/Form/FormCategory";
import DialogFormEdit from "@/components/DialogForm/DialogFormEdit";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";

export default function EditCategory() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useAuthStatus();
  const router = useRouter();

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

    if (!name) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await updateCategory(id, { name });
      router.push("/allcategory");
    } catch (error: any) {
      setError("Erro ao atualizar a categoria, tente novamente mais tarde.");
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

  if (!category) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-700 text-xl font-semibold">
            Categoria não encontrada.
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
      <main className="flex items-center pt-10 flex-col h-screen bg-white">
        <form
          className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
          aria-label="Formulário de edição de categoria"
        >
          <FormCategory name={name} setName={setName} />

          <DialogFormEdit handleEdit={handleEdit} />
        </form>
      </main>
    </div>
  );
}
