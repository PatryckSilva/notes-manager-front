"use client";

import { INote } from "@/@types/actions/notes";
import { ChevronDown, FilePlus, InboxIcon } from "lucide-react";
import Link from "next/link";
import React, { Fragment } from "react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { SidebarGroupContent, SidebarGroupLabel } from "../ui/sidebar";
import { CreateNoteSheet } from "./create-notes-sheet";

export const SidebarAllNotesCollapsible = ({ allNotes = [] }: { allNotes?: INote[] }) => {
  const userHasNotes = allNotes.length > 0;
  const [isOpenCollapsible, setIsOpenCollapsible] = React.useState(true);
  const [sheetIsOpen, setSheetIsOpen] = React.useState(false);

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
    <Collapsible onOpenChange={setIsOpenCollapsible} open={isOpenCollapsible}>
      <Sheet onOpenChange={setSheetIsOpen} open={sheetIsOpen}>
        <SheetTrigger asChild>
          <CollapsibleTrigger
            asChild
            className={`cursor-pointer rounded-md p-2 hover:bg-muted`}
            onClick={blockSheetOpenByLeftClick}
            onContextMenu={handleOpenCreateNote}
          >
            <SidebarGroupLabel className={`flex w-full items-center justify-between gap-1.5  `}>
              <aside className="flex items-center gap-1.5">
                <InboxIcon className={`size-5`} />
                <Link className="text-xs font-medium" href={"/"}>
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
        <CreateNoteSheet setSheetIsOpen={setSheetIsOpen} />
      </Sheet>

      <SidebarGroupContent>
        <CollapsibleContent
          className={`text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`}
        >
          <ScrollArea className="h-fit max-h-80 w-full ">
            <div className="pl-3.5">
              {userHasNotes &&
                allNotes.map(({ id, title }) => (
                  <Fragment key={id}>
                    <Link
                      className={`flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-muted`}
                      href={`/note/${id}`}
                    >
                      <span className="w-[200px] truncate text-sm">{title}</span>
                    </Link>
                    <Separator />
                  </Fragment>
                ))}

              {!userHasNotes && (
                <span className={`text-xs font-medium text-muted-foreground`}>
                  Você ainda não tem nenhuma nota.
                </span>
              )}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </SidebarGroupContent>
    </Collapsible>
  );
};
