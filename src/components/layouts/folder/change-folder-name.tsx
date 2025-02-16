"use client";

import { IFolder } from "@/@types/actions/folders";
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
import { useSidebar } from "@/components/ui/sidebar";
import { useCreateOrUpdateFolder } from "@/hooks/use-create-or-update-folder";

export const ChangeFolderName = ({ currentFolder }: { currentFolder: IFolder }) => {
  const { open } = useSidebar();

  const { form, onSubmit } = useCreateOrUpdateFolder({
    type: "update",
    folderId: currentFolder.id,
    defaultValues: {
      name: currentFolder.name,
    },
  });

  const submitFormAndCloseSheet = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <section className={`${open ? "w-3/4" : ""} mt-5 flex flex-col`}>
      <Form {...form}>
        <form
          className="flex w-full flex-wrap items-end gap-2.5 py-4"
          onSubmit={submitFormAndCloseSheet}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-3/4">
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

          <Button type="submit">Salvar novo nome</Button>
        </form>
      </Form>
    </section>
  );
};
