"use client";

// CHAKRA UI
import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";

//SERVICES
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

// HOOKS
import { useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { LoginAdmin } = useContext(AuthContext);
  const isAuthenticated = useAuthStatus();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    setIsLoading(true);

    try {
      const res = await LoginAdmin({ email, password });
      setSuccess(true);
      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <section className="flex items-center justify-center flex-col bg-white py-44">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
        >
          <Fieldset.Root size="lg" maxW="md" color="green.700">
            <Stack>
              <Fieldset.Legend className="text-2xl font-semibold text-green-700">
                Entrar
              </Fieldset.Legend>
            </Stack>

            <Fieldset.Content>
              <Field label="Email">
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  border="1px solid #ddd"
                  placeholder="Insira o email"
                  padding="1rem"
                  _placeholder={{ color: "gray.400" }}
                />
              </Field>

              <Field label="Senha">
                <Input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  border="1px solid #ddd"
                  placeholder="Insira a senha"
                  padding="1rem"
                  _placeholder={{ color: "gray.400" }}
                />
              </Field>
            </Fieldset.Content>

            <Button
              type="submit"
              alignSelf="flex-start"
              marginTop="1rem"
              width="100%"
              backgroundColor="green.800"
              color="white"
              border="1px solid green.950"
              className="hover:opacity-80"
            >
              {!isLoading && <p>Entrar</p>}
              {isLoading && <p>Aguarde...</p>}
            </Button>
          </Fieldset.Root>

          <Stack marginTop="1rem">
            {success && (
              <Alert status="success" title="Login feito com sucesso!"></Alert>
            )}
            {error && (
              <Alert
                status="error"
                title="Erro ao fazer login, tente novamente mais tarde."
              ></Alert>
            )}
          </Stack>
        </form>
      </section>
    </div>
  );
}
