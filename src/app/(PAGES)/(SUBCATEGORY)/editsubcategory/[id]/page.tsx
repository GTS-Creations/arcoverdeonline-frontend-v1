"use client";

// HOOKS
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

// SERVICES
import { getSubCategoryId, updateSubCategory } from "@/services/subCategory";
import { useGetCategory } from "@/hooks/useGetCategory";

// COMPONENTES
import FormSubCategory from "@/components/Form/FormSubCategory";
import DialogFormEdit from "@/components/DialogForm/DialogFormEdit";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";

export default function EditSubCategory() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [subCategory, setSubCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const isAuthenticated = useAuthStatus();
  const router = useRouter();

  const { categories, categoryId, setCategoryId, handleChange } =
    useGetCategory();

  useEffect(() => {
    if (!id) return;

    const fetchSubCategoryData = async () => {
      try {
        const data = await getSubCategoryId(id);
        setSubCategory(data);
        setName(data.name);
        setCategoryId(data.categoryId);
      } catch (error: any) {
        setError("Erro ao buscar a sub-categoria, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategoryData();
  }, [id]);

  const handleEdit = async (e: any) => {
    e.preventDefault();

    if (!name || !categoryId) {
      alert("Preencha todos os campos.");
      return;
    }
    
    try {
      await updateSubCategory(id, { name, categoryId });
      router.push("/allsubcategory");
    } catch (error: any) {
      setError(
        "Erro ao atualizar a sub-categoria, tente novamente mais tarde."
      );
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

  if (!subCategory) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-700 text-xl font-semibold">
            Sub-categoria não encontrada.
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
      <main
        className="flex items-center flex-col pt-10 h-screen bg-white"
        aria-labelledby="edit-subcategory-title"
      >

        <form
          className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
          onSubmit={handleEdit}
        >
          <FormSubCategory
            handleChange={handleChange}
            name={name}
            setName={setName}
            categoryId={categoryId}
            categories={categories}
          />

          <DialogFormEdit handleEdit={handleEdit} />
        </form>
      </main>
    </div>
  );
}
