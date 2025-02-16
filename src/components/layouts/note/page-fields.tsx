"use client";
import { INote } from "@/@types/actions/notes";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateOrUpdateNote } from "@/hooks/use-create-or-update-note";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const NotePageFields = ({ noteById }: { noteById?: INote }) => {
  const router = useRouter();

  useEffect(() => {
    if (!noteById) {
      router.push("/notes");
    }
  }, []);

  const { form, onSubmit } = useCreateOrUpdateNote({
    type: "update",
    noteId: noteById?.id || "",
    defaultValues: {
      title: noteById?.title || "",
      content: noteById?.content || "",
    },
  });

  return (
    <div className="mt-5 flex flex-col">
      <Form {...form}>
        <form className="w-full space-y-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-muted-foreground">
                  Título da nota:
                </FormLabel>
                <FormControl>
                  <Input placeholder="Título" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-muted-foreground">
                  Conteúdo da nota:
                </FormLabel>
                <FormControl>
                  <Textarea className={`h-40 italic`} placeholder="Escreva aqui..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    </div>
  );
};
