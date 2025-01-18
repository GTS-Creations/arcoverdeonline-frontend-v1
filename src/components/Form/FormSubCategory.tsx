import { Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const FormSubCategory = ({
  handleChange,
  name,
  setName,
  categoryId,
  categories,
}: any) => {
  const pathname = usePathname();
  const [title, setTitleForm] = useState("");
  const [subTitle, setSubTitle] = useState("");

  useEffect(() => {
    let currentTitle = "Formulário de Sub-Categoria";
    let currentSubTitle =
      "Preencha os campos abaixo para criar ou editar a Sub-Categoria.";

    if (pathname === "/pages/subcategories/createsubcategory") {
      currentTitle = "Criar Sub-Categoria";
      currentSubTitle = "Preencha os campos abaixo para criar a Sub-Categoria.";
    } else if (pathname.startsWith("/pages/subcategories/editsubcategory")) {
      currentTitle = "Editar Sub-Categoria";
      currentSubTitle =
        "Preencha os campos abaixo para editar a Sub-Categoria.";
    }

    setTitleForm(currentTitle);
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
          <Field label="Nome da sub-categoria*">
            <Input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              border="1px solid #ddd"
              placeholder="Insira a sub-categoria"
              padding="1rem"
              _placeholder={{ color: "gray.400" }}
              className="focus:ring focus:ring-green-600"
              autoComplete="off"
            />
          </Field>

          <label
            className="text-sm font-medium -mb-4"
            htmlFor="category-select"
          >
            Selecione uma categoria*
          </label>
          <select
            id="category-select"
            value={categoryId}
            onChange={handleChange}
            className="w-full mt-2 p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700 focus:ring focus:ring-green-600"
            required
          >
            <option value="">Selecione a categoria</option>
            {categories.map((categ: any) => (
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

export default FormSubCategory;
