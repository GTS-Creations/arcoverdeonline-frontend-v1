import { Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const FormSponsor = ({
  name,
  setName,
  logo,
  setLogo,
  contact,
  setContact,
  url,
  setUrl,
}: any) => {
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  useEffect(() => {
    let currentTitle = "Formulário de Patrocinador";
    let currentSubTitle =
      "Preencha os campos abaixo para criar ou editar o patrocinador.";

    if (pathname === "/createsponsor") {
      currentTitle = "Criar Patrocinador";
      currentSubTitle = "Preencha os campos abaixo para criar o patrocinador.";
    } else if (pathname.startsWith("/editsponsor")) {
      currentTitle = "Editar Patrocinador";
      currentSubTitle = "Preencha os campos abaixo para editar o patrocinador.";
    }

    setTitle(currentTitle);
    setSubTitle(currentSubTitle);
  }, [pathname]);

  const formatPhoneNumber = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "");
    if (numbersOnly.length <= 10) {
      return numbersOnly.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }
    return numbersOnly.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setContact(formattedValue);
  };

  return (
    <div>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend className="text-2xl font-semibold text-green-700">
            {title}
          </Fieldset.Legend>
          <Fieldset.HelperText className="text-sm text-gray-500">
            {subTitle}
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field label="Nome do Patrocinador*">
            <Input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              border="1px solid #ddd"
              placeholder="Insira o nome do patrocinador"
              padding="1rem"
              _placeholder={{ color: "gray.400" }}
              className="focus:ring focus:ring-green-600"
              autoComplete="off"
            />
          </Field>

          <Field label="Logo*">
            <Input
              name="logo"
              type="file"
              onChange={(e) => setLogo(e.target.files ? e.target.files[0] : null)}
              required
              className="focus:ring focus:ring-green-600"
            />
          </Field>

          <Field label="Contato*">
            <Input
              name="contact"
              type="text"
              value={contact}
              onChange={handlePhoneChange}
              required
              border="1px solid #ddd"
              placeholder="(xx)xxxxx-xxxx"
              padding="1rem"
              _placeholder={{ color: "gray.400" }}
              className="focus:ring focus:ring-green-600"
              autoComplete="off"
            />
          </Field>

          <Field label="URL / Site*">
            <Input
              name="url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              border="1px solid #ddd"
              placeholder="Insira a URL do patrocinador"
              padding="1rem"
              _placeholder={{ color: "gray.400" }}
              className="focus:ring focus:ring-green-600"
              autoComplete="off"
            />
          </Field>
        </Fieldset.Content>
      </Fieldset.Root>
    </div>
  );
};

export default FormSponsor;
