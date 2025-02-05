"use client";

import { Stack } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";

import { useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";
import { useRouter } from "next/navigation";

import FormSponsor from "@/components/Form/FormSponsor";
import ButtonFormCreate from "@/components/ButtonCreate/ButtonFormCreate";
import { createSponsor } from "@/services/sponsor";

export default function CreateSponsor() {
  const [name, setName] = useState<string>("");
  const [logo, setLogo] = useState<File | any>(null);
  const [contact, setContact] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const isAuthenticated = useAuthStatus();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

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
      await createSponsor(formData);
      setSuccess(true)
      router.push("/allsponsor");
    } catch (err: any) {
      console.error("Erro ao criar patrocinador:", err.message || err);
      setError(true);
    }
  };

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <main
        className="flex items-center flex-col bg-white h-screen pt-10"
        aria-labelledby="sponsor-title"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
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

          <ButtonFormCreate />

          <Stack marginTop="1rem">
            {success && (
              <Alert
                status="success"
                title="Patrocinador criado com sucesso!"
              />
            )}
            {error && (
              <Alert
                status="error"
                title="Erro ao criar patrocinador, tente novamente mais tarde."
              />
            )}
          </Stack>
        </form>
      </main>
    </div>
  );
}
