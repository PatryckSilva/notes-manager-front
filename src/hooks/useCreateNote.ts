import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formCreateNoteSchema = z.object({
  title: z
    .string({ message: "O título da nota é obrigatório!" })
    .min(1, "O título da nota é obrigatório!"),
  content: z
    .string({ message: "O conteúdo da nota é obrigatório!" })
    .min(1, "O conteúdo da nota é obrigatório!"),
});

export type TFormCreateNoteSchema = z.infer<typeof formCreateNoteSchema>;

export const useCreateNote = () => {
  const form = useForm<TFormCreateNoteSchema>({
    resolver: zodResolver(formCreateNoteSchema),
    defaultValues: {
      content: "",
      title: "",
    },
  });

  return { form };
};
