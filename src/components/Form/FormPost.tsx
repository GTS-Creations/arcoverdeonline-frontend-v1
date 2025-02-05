import { Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface FormPostProps {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  title: string;
  setTitle: (title: string) => void;
  pdf: File;
  setPdf: (file: File | null) => void;
  subCategoryId: string;
  subCategories: Array<{ id: string; name: string }>;
}

const FormPost: React.FC<FormPostProps> = ({
  handleChange,
  title,
  setTitle,
  pdf,
  setPdf,
  subCategoryId,
  subCategories,
}) => {
  const pathname = usePathname();
  const [titleForm, setTitleForm] = useState("");
  const [subTitle, setSubTitle] = useState("");

  useEffect(() => {
    let currentTitle = "Formulário de Publicação";
    let currentSubTitle =
      "Preencha os campos abaixo para criar ou editar a Publicação.";

    if (pathname === "/createpost") {
      currentTitle = "Criar Publicação";
      currentSubTitle = "Preencha os campos abaixo para criar a Publicação.";
    } else if (pathname.startsWith("/editpost")) {
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
          <Field label="Título*">
            <Input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              paddingLeft="1rem"
              border="1px solid #ddd"
              placeholder="Insira o título da publicação"
              className="focus:ring focus:ring-green-600"
              autoComplete="off"
            />
          </Field>

          <Field label="PDF*">
            <Input
              name="pdf"
              type="file"
              onChange={(e) => setPdf(e.target.files ? e.target.files[0] : null)}
              required
              className="focus:ring focus:ring-green-600"
            />
          </Field>

          <label
            className="text-sm font-medium -mb-4"
            htmlFor="sub-category-select"
          >
            Selecione uma sub-categoria*
          </label>
          <select
            id="sub-category-select"
            value={subCategoryId}
            onChange={handleChange}
            className="w-full mt-2 p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700 focus:ring focus:ring-green-600"
            required
          >
            <option value="">Selecione uma sub-categoria</option>
            {subCategories.map((categ) => (
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
