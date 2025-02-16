"use client";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCreateOrUpdateFolder } from "@/hooks/use-create-or-update-folder";
import { FolderPlus } from "lucide-react";
import React from "react";

export const AddFolder = () => {
  const [sheetIsOpen, setSheetIsOpen] = React.useState(false);

  const { form, onSubmit } = useCreateOrUpdateFolder({ type: "create" });

  const submitFormAndCloseSheet = () => {
    form.handleSubmit(onSubmit)();
    setSheetIsOpen(false);
  };

  return (
    <Sheet onOpenChange={setSheetIsOpen} open={sheetIsOpen}>
      <SheetTrigger asChild className={`cursor-pointer`}>
        <span className="flex items-center gap-1">
          <FolderPlus className={`size-4 `} />
        </span>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Crie uma nova Pasta</SheetTitle>
          <SheetDescription>Preencha o campo abaixo para criar uma nova pasta.</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form className="w-full space-y-4 py-4" onSubmit={submitFormAndCloseSheet}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-muted-foreground">
                    Nome da pasta:
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className={`w-full`} type="submit">
              Criar Pasta
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
