import { Button } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ButtonFormCreate = () => {
  const pathname = usePathname();
  const [name, setName] = useState("");

  useEffect(() => {
    let currentTitle = "Criar";

    if (pathname === "/editcategory")
      currentTitle = "Criar Categoria";
    else if (pathname === "/editsubcategory")
      currentTitle = "Criar Sub-Categoria";
    else if (pathname === "/editpost")
      currentTitle = "Criar Publicação";
    else if (pathname === "/editsponsor")
      currentTitle = "Criar Patrocinador";

    setName(currentTitle);
  }, [pathname]);

  const handleRedirect = async (e: any) => {
    e.preventDefault();
    let location = "/";

    if (pathname.startsWith("/createcategory"))
      location = "/allcategory";
    else if (pathname.startsWith("/createsubcategory"))
      location = "/allsubcategory";
    else if (pathname.startsWith("/createpost"))
      location = "/allpost";
    else if (pathname.startsWith("/createsponsor"))
      location = "/allsponsor";

    window.location.href = location;
  };

  return (
    <div className="flex justify-between gap-4 mt-4">
      <Button
        type="submit"
        width="48%"
        variant="solid"
        colorScheme="green"
        className="transition-all hover:opacity-80"
        border="1px solid green"
        color="green.700"
      >
        {name}
        <IoIosAddCircleOutline />
      </Button>

      <Button
        size="sm"
        type="submit"
        alignSelf="flex-start"
        width="48%"
        variant="solid"
        color="gray"
        border="1px solid gray"
        onClick={handleRedirect}
        paddingY="1.2rem"
      >
        Voltar
      </Button>
    </div>
  );
};

export default ButtonFormCreate;
