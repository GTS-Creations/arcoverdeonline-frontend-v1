"use client";

import { BsPencil } from "react-icons/bs";
import { Button, Table } from "@chakra-ui/react";

import Link from "next/link";
import { useEffect, useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

import { getAllSponsor, deleteSponsor } from "@/services/sponsor";
import DialogFormDelete from "@/components/DialogForm/DialogFormDelete";
import ButtonPageAllCreate from "@/components/ButtonCreate/ButtonPageAllCreate";

interface Sponsor {
  id: string;
  name: string;
  contact: string;
  url: string;
}

const AllSponsor = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAuthStatus();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const sponsorData = await getAllSponsor();
        setSponsors(sponsorData.content);
      } catch (error: any) {
        console.error("Erro ao carregar dados:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (sponsorId: string) => {
    try {
      await deleteSponsor(sponsorId);
      setSponsors((prev) => prev.filter((sponsor) => sponsor.id !== sponsorId));
    } catch (error: any) {
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  if (!sponsors) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-xl font-semibold">
          Patrocinador não encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="py-20 sm:px-5 h-screen bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-green-700 pb-5">
            Patrocinadores
          </h2>

          <div className="pb-5">
            <ButtonPageAllCreate />
          </div>

          <div>
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row
                  backgroundColor="transparent"
                  borderBottom="1px solid #ddd"
                >
                  <Table.ColumnHeader color="green.700">
                    Nome
                  </Table.ColumnHeader>

                  <Table.ColumnHeader color="green.700">
                    Contato
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {sponsors.map((sponsor) => (
                  <Table.Row
                    key={sponsor.id}
                    backgroundColor="transparent"
                    borderBottom="1px solid #ddd"
                  >
                    <Table.Cell color="green.700">{sponsor.name}</Table.Cell>
                    <Table.Cell color="green.700" className="break-all">{sponsor.contact}</Table.Cell>

                    <Table.Cell textAlign="right">
                      <Link href={`/pages/sponsors/editsponsor/${sponsor.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          border="1px solid green"
                          width="full"
                          color="green"
                        >
                          <span className="hidden sm:block">Editar</span>
                          <BsPencil />
                        </Button>
                      </Link>
                    </Table.Cell>

                    <Table.Cell>
                      <DialogFormDelete
                        handleDelete={() => handleDelete(sponsor.id)}
                      >
                        <span className="hidden sm:block">Apagar</span>
                      </DialogFormDelete>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSponsor;
