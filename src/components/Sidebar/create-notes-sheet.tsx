"use client";
import { TCreateNoteBody } from "@/@types/actions/notes";
import { createNote } from "@/actions/Notes";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { TFormCreateNoteSchema, useCreateNote } from "@/hooks/useCreateNote";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const CreateNoteSheet = ({
  setSheetIsOpen,
}: {
  setSheetIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const { form } = useCreateNote();

  async function onSubmit(values: TFormCreateNoteSchema) {
    const { content, title } = values;

    const newObj: TCreateNoteBody = {
      content,
      title,
    };

    const response = await createNote(newObj);

    if (!response.ok) {
      return toast({ title: response.body.message, variant: "destructive" });
    }

    router.refresh();
    setSheetIsOpen(false);
    return toast({ title: "Nota criada com sucesso", variant: "success" });
  }

  return (
    <SheetContent side={"left"}>
      <SheetHeader>
        <SheetTitle>Crie uma nova nota</SheetTitle>
        <SheetDescription>Preencha os campos abaixo para criar uma nova nota.</SheetDescription>
      </SheetHeader>

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

          <Button className={`w-full`} type="submit">
            Criar nota
          </Button>
        </form>
      </Form>
    </SheetContent>
  );
};
