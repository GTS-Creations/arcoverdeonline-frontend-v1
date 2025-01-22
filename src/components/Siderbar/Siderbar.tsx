"use client";

import Link from "next/link";
import { Button, HStack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { IoMdMenu } from "react-icons/io";

import useAuthStatus from "@/hooks/useAuthStatus";
import { logout } from "@/services/auth";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Sidebar: React.FC = () => {
  const isAuthenticated = useAuthStatus();

  return (
    <div className={isAuthenticated ? "block" : "hidden"}>
      <div className="w-56 h-full bg-green-50 text-gray-800 fixed top-0 left-0 shadow-md shadow-black hidden lg:block">
        <nav className="flex flex-col py-16 px-4 gap-4">
          <div className="px-16">
            <Link href="/pages/users/userid/1">
              <HStack>
                <Avatar
                  variant="solid"
                  name="Usuário Adm"
                  size="2xl"
                  width="full"
                  outlineWidth="2px"
                  outlineColor="green.700"
                  outlineOffset="2px"
                  outlineStyle="solid"
                />
              </HStack>
            </Link>
          </div>

          <div className="flex flex-col pt-10 pb-14 gap-4">
            <Link href="/">
              <Button
                type="submit"
                width="full"
                variant="solid"
                colorScheme="green"
                className="transition-all hover:opacity-80"
                color="white"
                backgroundColor="green.700"
              >
                Início
              </Button>
            </Link>

            <Link href="/pages/categories/allcategory">
              <Button
                type="submit"
                width="full"
                variant="solid"
                colorScheme="green"
                className="transition-all hover:opacity-80"
                color="white"
                backgroundColor="green.700"
              >
                Categorias
              </Button>
            </Link>

            <Link href="/pages/subcategories/allsubcategory">
              <Button
                type="submit"
                width="full"
                variant="solid"
                colorScheme="green"
                className="transition-all hover:opacity-80"
                color="white"
                backgroundColor="green.700"
              >
                Sub-Categorias
              </Button>
            </Link>

            <Link href="/pages/posts/allpost">
              <Button
                type="submit"
                width="full"
                variant="solid"
                colorScheme="green"
                className="transition-all hover:opacity-80"
                color="white"
                backgroundColor="green.700"
              >
                Publicações
              </Button>
            </Link>

            <Link href="/pages/sponsors/allsponsor">
              <Button
                type="submit"
                width="full"
                variant="solid"
                colorScheme="green"
                className="transition-all hover:opacity-80"
                color="white"
                backgroundColor="green.700"
              >
                Patrocinadores
              </Button>
            </Link>
          </div>

          <footer className="pt-32">
            <Button
              type="submit"
              width="full"
              variant="solid"
              colorScheme="green"
              className="transition-all hover:opacity-80"
              color="white"
              backgroundColor="green.700"
              onClick={() => logout()}
            >
              Sair
            </Button>
          </footer>
        </nav>
      </div>
      <div className="fixed z-10 right-5 bottom-10 lg:hidden">
        <DrawerRoot placement="start" size="xs">
          <DrawerBackdrop />
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              size="2xl"
              shadow="lg"
              shadowColor="black"
              rounded="full"
            >
              <IoMdMenu className="w-full h-full bg-green-700 hover:bg-green-500 rounded-full text-white p-2" />
            </Button>
          </DrawerTrigger>
          <DrawerContent backgroundColor="green.50">
            <DrawerBody>
              <div className="px-24 pt-16">
                <Link href="/pages/users/userid/1">
                  <HStack>
                    <Avatar
                      variant="solid"
                      name="Usuário Adm"
                      size="2xl"
                      width="full"
                      outlineWidth="2px"
                      outlineColor="green.700"
                      outlineOffset="2px"
                      outlineStyle="solid"
                    />
                  </HStack>
                </Link>
              </div>

              <div className="flex flex-col pt-10 pb-14 gap-4">
                <Link href="/">
                  <Button
                    type="submit"
                    width="full"
                    variant="solid"
                    colorScheme="green"
                    className="transition-all hover:opacity-80"
                    color="white"
                    backgroundColor="green.700"
                  >
                    Início
                  </Button>
                </Link>

                <Link href="/pages/categories/allcategory">
                  <Button
                    type="submit"
                    width="full"
                    variant="solid"
                    colorScheme="green"
                    className="transition-all hover:opacity-80"
                    color="white"
                    backgroundColor="green.700"
                  >
                    Categorias
                  </Button>
                </Link>

                <Link href="/pages/subcategories/allsubcategory">
                  <Button
                    type="submit"
                    width="full"
                    variant="solid"
                    colorScheme="green"
                    className="transition-all hover:opacity-80"
                    color="white"
                    backgroundColor="green.700"
                  >
                    Sub-Categorias
                  </Button>
                </Link>

                <Link href="/pages/posts/allpost">
                  <Button
                    type="submit"
                    width="full"
                    variant="solid"
                    colorScheme="green"
                    className="transition-all hover:opacity-80"
                    color="white"
                    backgroundColor="green.700"
                  >
                    Publicações
                  </Button>
                </Link>

                <Link href="/pages/sponsors/allsponsor">
                  <Button
                    type="submit"
                    width="full"
                    variant="solid"
                    colorScheme="green"
                    className="transition-all hover:opacity-80"
                    color="white"
                    backgroundColor="green.700"
                  >
                    Patrocinadores
                  </Button>
                </Link>
              </div>

              <footer className="pt-44">
                <Button
                  type="submit"
                  width="full"
                  variant="solid"
                  colorScheme="green"
                  className="transition-all hover:opacity-80"
                  color="white"
                  backgroundColor="green.700"
                  onClick={() => logout()}
                >
                  Sair
                </Button>
              </footer>
            </DrawerBody>
            <DrawerCloseTrigger />
          </DrawerContent>
        </DrawerRoot>
      </div>
    </div>
  );
};

export default Sidebar;
