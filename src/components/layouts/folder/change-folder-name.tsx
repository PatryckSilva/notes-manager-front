"use client";

import { IFolder } from "@/@types/actions/folders";
import { deleteFolder } from "@/actions/Folders";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const ChangeFolderName = ({ currentFolder }: { currentFolder: IFolder }) => {
  const { open } = useSidebar();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);

  const { form, onSubmit, isLoading } = useCreateOrUpdateFolder({
    type: "update",
    folderId: currentFolder.id,
    defaultValues: {
      name: currentFolder.name,
    },
  });

  const submitFormAndCloseSheet = () => {
    form.handleSubmit(onSubmit)();
  };

  const handleDeleteFolder = async () => {
    setIsLoadingDelete(true);
    if (!currentFolder.id)
      return toast({ title: "Erro ao deletar pasta!", variant: "destructive" });

    const response = await deleteFolder(currentFolder.id);

    if (response.ok) {
      return router.refresh();
    }

    return toast({ title: "Erro ao deletar pasta!", variant: "destructive" });
  };

  return (
    <section className={`${open ? "md:w-3/4" : ""} mt-5 flex flex-col`}>
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

          <Button className={`w-32`} type="submit">
            {isLoading ? <Loader className={`animate-spin`} /> : "Salvar"}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className={`w-32`} variant={"destructive"}>
                {isLoadingDelete ? <Loader className={`animate-spin`} /> : "Deletar"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação é <strong>irreversível</strong>. Essa pasta será deletada{" "}
                  <strong>permanentemente</strong>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className={`bg-destructive hover:bg-destructive`}
                  onClick={handleDeleteFolder}
                >
                  Deletar Pasta
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </section>
  );
};
