import { Button } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ButtonPageAllCreate = () => {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [href, setHref] = useState("");

  useEffect(() => {
    let currentTitle = "Criar";
    let href = "";

    if (pathname === "/allcategory") {
      currentTitle = "Criar Categoria";
      href = "/createcategory";
    } else if (pathname === "/allsubcategory") {
      currentTitle = "Criar Sub-Categoria";
      href = "/createsubcategory";
    } else if (pathname === "/allpost") {
      currentTitle = "Criar Publicação";
      href = "/createpost";
    } else if (pathname === "/allsponsor") {
      currentTitle = "Criar Patrocinador";
      href = "/createsponsor";
    }

    setName(currentTitle);
    setHref(href);
  }, [pathname]);

  return (
    <div className="px-4">
      <Link href={href}>
        <Button
          type="submit"
          marginTop="1rem"
          width="full"
          variant="solid"
          colorScheme="green"
          className="transition-all hover:opacity-80"
          border="1px solid green"
          color="green.700"
        >
          {name}
          <IoIosAddCircleOutline />
        </Button>
      </Link>
    </div>
  );
};

export default ButtonPageAllCreate;
