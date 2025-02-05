"use client";

// HOOKS
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

// SERVICES
import { getSponsorId, updateSponsor } from "@/services/sponsor";

// COMPONENTES
import FormSponsor from "@/components/Form/FormSponsor";
import DialogFormEdit from "@/components/DialogForm/DialogFormEdit";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";

export default function EditSponsor() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<File | any>(null);
  const [contact, setContact] = useState("");
  const [url, setUrl] = useState("");
  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const isAuthenticated = useAuthStatus();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchSponsorData = async () => {
      try {
        const data = await getSponsorId(id);
        setSponsor(data);
        setName(data.name);
        setContact(data.contact);
        setUrl(data.url);
        setLogo(data.logo);
      } catch (error: any) {
        setError("Erro ao buscar o patrocinador, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchSponsorData();
  }, [id]);

  const handleEdit = async (e: any) => {
    e.preventDefault();

    const formatosPermitidos = ["image/png", "image/jpeg"];

    if (logo && !formatosPermitidos.includes(logo.type)) {
      setError(true);
      alert("O arquivo deve ser uma imagem PNG ou JPG");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("logo", logo);
    formData.append("contact", contact);
    formData.append("url", url);

    try {
      const res = await updateSponsor(id, { formData });
      router.push("/allsponsor");
      return res;
    } catch (error: any) {
      console.error("Erro ao atualizar o patrocinador, tente novamente mais tarde.");
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

  if (!sponsor) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-700 text-xl font-semibold">
            Patrocinador não encontrado.
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
        aria-labelledby="edit-sponsor-title"
      >
        <form
          className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
          onSubmit={handleEdit}
        >
          <FormSponsor
            name={name}
            setName={setName}
            logo={logo}
            setLogo={setLogo}
            contact={contact}
            setContact={setContact}
            url={url}
            setUrl={setUrl}
          />

          <DialogFormEdit handleEdit={handleEdit} />
        </form>
      </main>
    </div>
  );
}
