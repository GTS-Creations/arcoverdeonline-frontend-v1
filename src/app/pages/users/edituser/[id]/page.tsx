"use client";

// HOOKS
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

// SERVICES
import { getUserId, updateUser } from "@/services/user";

// COMPONENTES
import DialogFormEdit from "@/components/DialogForm/DialogFormEdit";
import FormUser from "@/components/Form/FormUser";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";

export default function EditUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useAuthStatus();

  useEffect(() => {
    if (!id) return;

    const fetchUserData = async () => {
      try {
        const data = await getUserId();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
      } catch (error: any) {
        setError("Erro ao buscar o usuário, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleEdit = async (e: any) => {
    e.preventDefault();

    if (!password) {
      return alert("A Senha é obrigatória!");
    }

    try {
      await updateUser({ name, email, password });
      window.location.href = "/pages/users/userid/1";
    } catch (error: any) {
      setError("Erro ao atualizar o usuário, tente novamente mais tarde.");
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

  if (!user) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-700 text-xl font-semibold">
            Usuário não encontrado.
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
    <main className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <section className="flex items-center pt-10 flex-col h-screen bg-white">
        <form
          className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
          aria-labelledby="form-title"
        >
          <h2 id="form-title" className="sr-only">
            Formulário de Usuário
          </h2>

          <FormUser
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />

          <DialogFormEdit handleEdit={handleEdit} />
        </form>
      </section>
    </main>
  );
}
