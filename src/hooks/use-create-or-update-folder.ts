import { ICreateFolderBody } from "@/@types/actions/folders";
import { createFolder, updateFolder } from "@/actions/Folders";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "./use-toast";

const formFolderSchema = z.object({
  name: z
    .string({ message: "O título da nota é obrigatório!" })
    .min(1, "O título da nota é obrigatório!"),
});

export type TFormFolderSchema = z.infer<typeof formFolderSchema>;

type UseFolderParams =
  | { type: "create" }
  | { type: "update"; folderId: string; defaultValues: TFormFolderSchema };

export const useCreateOrUpdateFolder = (params: UseFolderParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { type } = params;
  const folderId = type === "update" ? params.folderId : undefined;
  const defaultValues = type === "update" ? params.defaultValues : { name: "" };

  const form = useForm<TFormFolderSchema>({
    resolver: zodResolver(formFolderSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: TFormFolderSchema) {
    setIsLoading(true);
    try {
      if (type === "create") {
        const newObj: ICreateFolderBody = {
          name: values.name,
        };

        const response = await createFolder(newObj);
        if (!response.ok) {
          return toast({
            title: response.body.message,
            variant: "destructive",
          });
        }

        return toast({ title: "Pasta criada com sucesso", variant: "success" });
      } else {
        const newObj = {
          name: values.name,
        };

        if (!folderId) {
          return toast({ title: "Note ID is missing", variant: "destructive" });
        }

        const response = await updateFolder(folderId, newObj);
        if (!response.ok) {
          return toast({
            title: response.body.message,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error(error);
      const _type = type === "create" ? "criar" : "atualizar";
      return toast({
        title: `Erro ao ${_type} ou atualizar pasta`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return { form, onSubmit, isLoading };
};
