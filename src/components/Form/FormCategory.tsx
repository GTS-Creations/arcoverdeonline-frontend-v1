import { Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const FormCategory = ({ name, setName }: any) => {
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  useEffect(() => {
    let currentTitle = "Formulário de Categoria";
    let currentSubTitle =
      "Preencha os campos abaixo para criar ou editar a Categoria.";

    if (pathname === "/pages/categories/createcategory") {
      currentTitle = "Criar Categoria";
      currentSubTitle = "Preencha os campos abaixo para criar a Categoria.";
    } else if (pathname.startsWith("/pages/categories/editcategory")) {
      currentTitle = "Editar Categoria";
      currentSubTitle = "Preencha os campos abaixo para editar a Categoria.";
    }

    setTitle(currentTitle);
    setSubTitle(currentSubTitle);
  }, [pathname]);

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
          <Field label="Nome da Categoria*">
            <Input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              border="1px solid #ddd"
              placeholder="Insira o nome da categoria"
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

export default FormCategory;
