"use client";

import { Stack } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";

import { useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

import FormSponsor from "@/components/Form/FormSponsor";
import ButtonFormCreate from "@/components/ButtonCreate/ButtonFormCreate";
import { createSponsor } from "@/services/sponsor";

export default function CreateSponsor() {
  const [name, setName] = useState<string>("");
  const [logo, setLogo] = useState<File | null>(null);
  const [contact, setContact] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const isAuthenticated = useAuthStatus();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (logo) formData.append("logo", logo); // Adiciona o arquivo da logo
      formData.append("contact", contact);
      formData.append("url", url);

      await createSponsor(formData); // Envia o FormData

      setSuccess(true);

      // Limpeza do formulário
      setName("");
      setLogo(null);
      setContact("");
      setUrl("");
    } catch (err: any) {
      console.error("Erro ao criar patrocinador:", err.message || err);
      setError(true);
    }
  };

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="flex items-center flex-col bg-white h-screen pt-10">
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
      </div>
    </div>
  );
}
