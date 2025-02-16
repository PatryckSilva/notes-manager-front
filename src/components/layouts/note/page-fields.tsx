"use client";
import { IFolder } from "@/@types/actions/folders";
import { INote } from "@/@types/actions/notes";
import { deleteNote } from "@/actions/Notes";
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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSidebar } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { useCreateOrUpdateNote } from "@/hooks/use-create-or-update-note";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const NotePageFields = ({
  noteById,
  allFolders,
}: {
  noteById?: INote;
  allFolders: IFolder[];
}) => {
  const { open } = useSidebar();
  const router = useRouter();
  const { toast } = useToast();
  const [openPopover, setOpenPopover] = React.useState(false);

  useEffect(() => {
    if (!noteById) {
      router.push("/notes");
    }
  }, []);

  const { form, onSubmit, setFolderIdValue } = useCreateOrUpdateNote({
    type: "update",
    noteId: noteById?.id || "",
    defaultValues: {
      title: noteById?.title || "",
      content: noteById?.content || "",
    },
  });

  const currentFolder = allFolders.find(folder => folder.id === noteById?.folderId);

  const handleDeleteNote = async () => {
    if (!noteById) return toast({ title: "Nota não encontrada", variant: "destructive" });

    const response = await deleteNote(noteById?.id || "");

    if (response.ok) {
      return router.refresh();
    }

    return toast({ title: "Erro ao deletar nota", variant: "destructive" });
  };
  return (
    <section className={`${open ? "w-3/4" : ""} mt-5 flex flex-col`}>
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
                  <Textarea className={`h-80 italic`} placeholder="Escreva aqui..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <span className={`text-sm font-semibold text-muted-foreground`}>Pasta Atual:</span>
            <span className={`ml-2 text-sm font-semibold text-primary`}>
              {currentFolder?.name || "Sem pasta"}
            </span>
          </div>

          <FormField
            control={form.control}
            name="folderId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-muted-foreground">
                  Selecione a pasta:
                </FormLabel>
                <br />
                <FormControl>
                  <Popover onOpenChange={setOpenPopover} open={openPopover}>
                    <PopoverTrigger asChild>
                      <Button
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                        role="combobox"
                        variant="outline"
                      >
                        {field.value
                          ? allFolders.find(folder => folder.id === field.value)?.name
                          : "Select Folder"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandList>
                          <CommandEmpty>Nenhuma pasta encontrada.</CommandEmpty>
                          <CommandGroup>
                            {allFolders.map(folder => (
                              <CommandItem
                                key={folder.id}
                                onSelect={currentValue => {
                                  setFolderIdValue(form, currentValue);
                                  setOpenPopover(false);
                                }}
                                value={folder.id}
                              >
                                {folder.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    field.value === folder.id ? "opacity-100" : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="mr-2" type="submit">
            Salvar
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Deletar Nota</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação é <strong>irreversível</strong>. Essa nota será deletada{" "}
                  <strong>permanentemente</strong>.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className={`bg-destructive hover:bg-destructive`}
                  onClick={handleDeleteNote}
                >
                  Deletar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </section>
  );
};
