import { Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

const FormUser = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}: any) => {
  return (
    <div>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend className="text-2xl font-semibold text-green-700">
            Formulário do usuário
          </Fieldset.Legend>
          <Fieldset.HelperText className="text-sm text-gray-500">
            Preencha os campos abaixo para editar o usuário.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field label="Nome*">
            <Input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              border="1px solid #ddd"
              placeholder="Insira o nome do usuário"
              padding="1rem"
              _placeholder={{ color: "gray.400" }}
              className="focus:ring focus:ring-green-600"
              autoComplete="off"
            />
          </Field>

          <Field label="Email*">
            <Input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              border="1px solid #ddd"
              placeholder="Insira o email do usuário"
              padding="1rem"
              _placeholder={{ color: "gray.400" }}
              className="focus:ring focus:ring-green-600"
              autoComplete="off"
            />
          </Field>

          <Field label="Senha*">
            <Input
              name="name"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              border="1px solid #ddd"
              placeholder="Insira a senha do usuário"
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

export default FormUser;
