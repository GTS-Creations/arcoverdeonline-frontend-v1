import { Button } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DialogFormEdit = ({ handleEdit, handleDelete }: any) => {
  const pathname = usePathname();
  const [name, setName] = useState("");

  useEffect(() => {
    let currentEdit = "Editar";

    if (pathname.startsWith("/pages/categories/EditCategory"))
      currentEdit = "esta categoria";

    else if (pathname.startsWith("/pages/subCategories/EditSubCategory"))
      currentEdit = "esta sub-categoria";

    else if (pathname.startsWith("/pages/posts/EditPost"))
      currentEdit = "esta publicação";

    else if (pathname.startsWith("/pages/sponsors/EditSponsor/"))
      currentEdit = "este patrocinador";

    setName(currentEdit);
  }, [pathname]);

  return (
    <div className="flex justify-between gap-4 mt-4">
      <DialogRoot role="alertdialog" placement="center">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            border="1px solid green"
            width="48%"
            color="green"
          >
            Editar
          </Button>
        </DialogTrigger>
        <DialogContent backgroundColor="white">
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja editar {name}?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogActionTrigger>
            <Button color="green" onClick={handleEdit}>
              Editar
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>

      <DialogRoot role="alertdialog" placement="center">
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            border="1px solid red"
            width="48%"
            color="red"
          >
            Apagar
          </Button>
        </DialogTrigger>
        <DialogContent backgroundColor="white">
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja apagar {name}?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogActionTrigger>
            <Button color="red" onClick={handleDelete}>
              Apagar
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </div>
  );
};

export default DialogFormEdit;