"use client";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCreateOrUpdateNote } from "@/hooks/useCreateNote";
import React, { Dispatch, SetStateAction } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const CreateNoteSheet = ({
  setSheetIsOpen,
}: {
  setSheetIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { form, onSubmit } = useCreateOrUpdateNote({
    type: "create",
  });

  const submitFormAndCloseSheet = () => {
    form.handleSubmit(onSubmit)();
    setSheetIsOpen(false);
  };

  return (
    <SheetContent side={"left"}>
      <SheetHeader>
        <SheetTitle>Crie uma nova nota</SheetTitle>
        <SheetDescription>Preencha os campos abaixo para criar uma nova nota.</SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form className="w-full space-y-4 py-4" onSubmit={submitFormAndCloseSheet}>
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
