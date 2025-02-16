"use client";
import { IFolder } from "@/@types/actions/folders";
import { Button } from "@/components/ui/button";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarGroupLabel } from "@/components/ui/sidebar";
import { useCreateOrUpdateNote } from "@/hooks/use-create-or-update-note";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, ChevronsUpDown, FilePlus, InboxIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

export const AddNotes = ({
  isOpenCollapsible,
  setIsOpenCollapsible,
  allFolders,
}: {
  allFolders: IFolder[];
  isOpenCollapsible: boolean;
  setIsOpenCollapsible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = React.useState(false);
  const [sheetIsOpen, setSheetIsOpen] = React.useState(false);

  const { form, onSubmit, setFolderIdValue } = useCreateOrUpdateNote({
    type: "create",
  });

  const submitFormAndCloseSheet = () => {
    form.handleSubmit(onSubmit)();
    setSheetIsOpen(false);
  };

  const handleOpenCollapsible = () => {
    setIsOpenCollapsible(prev => !prev);
  };

  const handleOpenCreateNote = (event: React.MouseEvent) => {
    event.preventDefault();

    setSheetIsOpen(true);
  };

  const blockSheetOpenByLeftClick = (event: React.MouseEvent) => {
    event.preventDefault();
    handleOpenCollapsible();
  };

  return (
    <Sheet onOpenChange={setSheetIsOpen} open={sheetIsOpen}>
      <SheetTrigger asChild>
        <CollapsibleTrigger
          asChild
          className={`cursor-pointer ${isOpenCollapsible ? "rounded-none border-b border-l border-border" : ""}`}
          onClick={blockSheetOpenByLeftClick}
          onContextMenu={handleOpenCreateNote}
        >
          <SidebarGroupLabel
            className={`flex w-full items-center justify-between gap-1.5 hover:bg-muted`}
          >
            <aside className="flex items-center gap-1.5">
              <InboxIcon className={`size-5`} />
              <Link className="text-xs font-medium underline" href={"/"}>
                Todas as Notas
              </Link>
            </aside>

            <aside className="flex items-center gap-1">
              <button onClick={handleOpenCreateNote}>
                <span className={`sr-only`}>Criar nova Nota</span>
                <FilePlus className={`size-4 `} />
              </button>

              <ChevronDown
                className={`ml-auto transition-transform ${isOpenCollapsible ? "rotate-180" : ""}`}
              />
            </aside>
          </SidebarGroupLabel>
        </CollapsibleTrigger>
      </SheetTrigger>

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

            <FormField
              control={form.control}
              name="folderId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Popover onOpenChange={setOpen} open={open}>
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
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {allFolders.map(folder => (
                                <CommandItem
                                  key={folder.id}
                                  onSelect={currentValue => {
                                    setFolderIdValue(form, currentValue);
                                    setOpen(false);
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
            <Button className={`w-full`} type="submit">
              Criar nota
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
