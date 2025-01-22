"use client";

import { BsPencil } from "react-icons/bs";
import { Button, HStack, Stack, Table } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";

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
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const isAuthenticated = useAuthStatus();

  const fetchData = async () => {
    try {
      const sponsorData = await getAllSponsor(page, 10);
      setSponsors(sponsorData.content);
      setTotalItems(sponsorData.totalElements);
    } catch (error: any) {
      console.error("Erro ao carregar dados:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleDelete = async (sponsorId: string) => {
    try {
      await deleteSponsor(sponsorId);
      setSponsors((prev) => prev.filter((sponsor) => sponsor.id !== sponsorId));
    } catch (error: any) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-green-700 text-xl font-semibold">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!sponsors) {
    return (
      <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-700 text-xl font-semibold">
            Patrocinador não encontrado.
          </p>
        </div>
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
            <Stack width="full" gap="5">
              <Table.Root size="sm">
                <Table.Header>
                  <Table.Row
                    backgroundColor="transparent"
                    borderBottom="1px solid #ddd"
                  >
                    <Table.ColumnHeader color="green.700" fontWeight="700">
                      Nome
                    </Table.ColumnHeader>

                    <Table.ColumnHeader color="green.700" fontWeight="700">
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

                      <Table.Cell
                        color="green.700"
                        className="break-all pr-20 md:pr-56 lg:pr-96"
                      >
                        {sponsor.contact}
                      </Table.Cell>

                      <Table.Cell textAlign="end">
                        <Link
                          href={`/pages/sponsors/editsponsor/${sponsor.id}`}
                        >
                          <Button
                            variant="solid"
                            size="sm"
                            padding="1rem"
                            backgroundColor="green.700"
                            color="white"
                          >
                            <span className="hidden sm:block">Editar</span>
                            <BsPencil />
                          </Button>
                        </Link>
                      </Table.Cell>

                      <Table.Cell textAlign="end">
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

              <PaginationRoot
                count={totalItems}
                pageSize={10}
                page={page + 1}
                onPageChange={(e) => setPage(e.page - 1)}
                color="white"
                backgroundColor="green.700"
              >
                <HStack wrap="wrap">
                  <PaginationPrevTrigger />
                  <PaginationItems className="hover:border-white hover:border focus:border focus:border-white" />
                  <PaginationNextTrigger />
                </HStack>
              </PaginationRoot>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSponsor;
