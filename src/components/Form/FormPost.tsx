import { Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const FormPost = ({
  handleChange,
  title,
  setTitle,
  pdf,
  setPdf,
  subCategoryId,
  subCategories,
}: any) => {
  const pathname = usePathname();
  const [titleForm, setTitleForm] = useState("");
  const [subTitle, setSubTitle] = useState("");

  useEffect(() => {
    let currentTitle = "Formulário de Publicação";
    let currentSubTitle =
      "Preencha os campos abaixo para criar ou editar a Publicação.";

    if (pathname === "/pages/posts/CreatePost") {
      currentTitle = "Criar Publicação";
      currentSubTitle = "Preencha os campos abaixo para criar a Publicação.";
    } else if (pathname.startsWith("/pages/posts/EditPost")) {
      currentTitle = "Editar Publicação";
      currentSubTitle = "Preencha os campos abaixo para editar a Publicação.";
    }

    setTitleForm(currentTitle);
    setSubTitle(currentSubTitle);
  }, [pathname]);

  return (
    <div>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend className="text-2xl font-semibold text-green-700">
            {titleForm}
          </Fieldset.Legend>
          <Fieldset.HelperText className="text-sm text-gray-500">
            {subTitle}
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field label="Título">
            <Input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              border="1px solid #ddd"
              placeholder="Insira o título"
              padding="1rem"
              _placeholder={{ color: "gray.400" }}
              className="focus:ring focus:ring-gray-600"
            />
          </Field>

          <Field label="PDF">
            <Input
              name="pdf"
              type="text"
              value={pdf}
              onChange={(e) => setPdf(e.target.value)}
              required
              border="1px solid #ddd"
              placeholder="Insira o link do PDF"
              padding="1rem"
              _placeholder={{ color: "gray.400" }}
              className="focus:ring focus:ring-gray-600"
            />
          </Field>

          <label
            className="text-sm font-medium -mb-4"
            htmlFor="sub-category-select"
          >
            Selecione uma sub-categoria
          </label>
          <select
            id="sub-category-select"
            value={subCategoryId}
            onChange={handleChange}
            className="w-full mt-2 p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700 focus:ring focus:ring-gray-600"
            required
          >
            <option value="">Selecione uma sub-categoria</option>
            {subCategories.map((categ:any) => (
              <option key={categ.id} value={categ.id}>
                {categ.name}
              </option>
            ))}
          </select>
        </Fieldset.Content>
      </Fieldset.Root>
    </div>
  );
};

export default FormPost;
