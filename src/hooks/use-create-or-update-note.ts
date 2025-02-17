import { TCreateNoteBody, TUpdateNoteBody } from "@/@types/actions/notes";
import { createNote, updateNote } from "@/actions/Notes";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

const formCreateNoteSchema = z.object({
  title: z
    .string({ message: "O título da nota é obrigatório!" })
    .min(1, "O título da nota é obrigatório!"),
  content: z.string().optional(),
  folderId: z.string().optional(),
});

export type TFormCreateNoteSchema = z.infer<typeof formCreateNoteSchema>;

const formUpdateNoteSchema = z.object({
  title: z
    .string({ message: "O título da nota é obrigatório!" })
    .min(1, "O título da nota é obrigatório!"),
  content: z.string().optional(),
  folderId: z.string().optional(),
});

export type TFormUpdateNoteSchema = z.infer<typeof formUpdateNoteSchema>;

type UseNoteParams =
  | { type: "create"; defaultValues?: TFormCreateNoteSchema }
  | { type: "update"; noteId: string; defaultValues: TFormUpdateNoteSchema };

export const useCreateOrUpdateNote = (params: UseNoteParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const { type, defaultValues } = params;
  const noteId = type === "update" ? params.noteId : undefined;
  const formSchema = type === "create" ? formCreateNoteSchema : formUpdateNoteSchema;
  type TFormData = z.infer<typeof formSchema>;

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: TFormData) {
    setIsLoading(true);
    try {
      if (type === "create") {
        console.log("create");
        const newObj: TCreateNoteBody = {
          title: values.title,
          content: values.content ?? "",
          folderId: values.folderId ?? "",
        };

        const response = await createNote(newObj);
        console.log(`response`, response);
        if (!response.ok) {
          return toast({
            title: response.body.message,
            variant: "destructive",
          });
        }

        router.refresh();
        return toast({ title: "Nota criada com sucesso", variant: "success" });
      }

      if (type === "update") {
        console.log("update");
        const newObj: TUpdateNoteBody = {
          title: values.title,
          content: values.content,
          folderId: values.folderId,
        };

        if (!noteId) {
          return toast({
            title: "Nota não encontrada",
            variant: "destructive",
          });
        }

        const response = await updateNote(noteId, newObj);
        if (!response.ok) {
          return toast({
            title: response.body.message,
            variant: "destructive",
          });
        }

        router.refresh();
        return toast({
          title: "Nota atualizada com sucesso",
          variant: "success",
        });
      }
    } catch (err) {
      console.log(err);
      const _type = type === "create" ? "criar" : "atualizar";
      return toast({
        title: `Falha ao ${_type} nota`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const setFolderIdValue = (
    form: UseFormReturn<
      {
        title: string;
        content?: string | undefined;
        folderId?: string | undefined;
      },
      undefined
    >,
    folderId: string,
  ) => {
    form.setValue("folderId", folderId);
  };

  return { form, onSubmit, setFolderIdValue, isLoading };
};
