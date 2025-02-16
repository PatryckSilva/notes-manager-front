import { TCreateNoteBody, TUpdateNoteBody } from "@/@types/actions/notes";
import { createNote, updateNote } from "@/actions/Notes";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formCreateNoteSchema = z.object({
  title: z
    .string({ message: "O título da nota é obrigatório!" })
    .min(1, "O título da nota é obrigatório!"),
  content: z.string().optional(),
});

export type TFormCreateNoteSchema = z.infer<typeof formCreateNoteSchema>;

const formUpdateNoteSchema = z.object({
  title: z
    .string({ message: "O título da nota é obrigatório!" })
    .min(1, "O título da nota é obrigatório!"),
  content: z.string().optional(),
});

export type TFormUpdateNoteSchema = z.infer<typeof formUpdateNoteSchema>;

type UseNoteParams =
  | { type: "create"; defaultValues?: TFormCreateNoteSchema }
  | { type: "update"; noteId: string; defaultValues: TFormUpdateNoteSchema };

export const useCreateOrUpdateNote = (params: UseNoteParams) => {
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
    if (type === "create") {
      const newObj: TCreateNoteBody = {
        title: values.title,
        content: values.content ?? "",
      };

      const response = await createNote(newObj);
      if (!response.ok) {
        return toast({ title: response.body.message, variant: "destructive" });
      }

      router.refresh();
      return toast({ title: "Nota criada com sucesso", variant: "success" });
    } else {
      console.log("update note");
      const newObj: TUpdateNoteBody = {
        title: values.title,
        content: values.content,
      };

      if (!noteId) {
        return toast({ title: "Note ID is missing", variant: "destructive" });
      }

      const response = await updateNote(noteId, newObj);
      if (!response.ok) {
        return toast({ title: response.body.message, variant: "destructive" });
      }

      router.refresh();
      return toast({
        title: "Nota atualizada com sucesso",
        variant: "success",
      });
    }
  }

  return { form, onSubmit };
};
