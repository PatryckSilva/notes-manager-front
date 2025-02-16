"use client";

import { INotes } from "@/@types/actions/notes";
import React, { Fragment } from "react";

import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { SidebarGroup, SidebarGroupLabel } from "../ui/sidebar";
import { CreateNoteSheet } from "./create-notes-sheet";
import { SidebarAllNotesCollapsibleTrigger } from "./Sidebar-all-notes-collapsible-trigger";

export const SidebarAllNotesCollapsible = ({ allNotes = [] }: { allNotes?: INotes[] }) => {
  const userHasNotes = allNotes.length > 0;
  const [isOpenCollapsible, setIsOpenCollapsible] = React.useState(false);
  const [sheetIsOpen, setSheetIsOpen] = React.useState(false);

  const handleOpenCollapsible = () => {
    setIsOpenCollapsible(prev => !prev);
  };

  return (
    <Collapsible onOpenChange={setIsOpenCollapsible} open={isOpenCollapsible}>
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <Sheet onOpenChange={setSheetIsOpen} open={sheetIsOpen}>
            <SheetTrigger asChild>
              <SidebarAllNotesCollapsibleTrigger
                handleOpenCollapsible={handleOpenCollapsible}
                isOpenCollapsible={isOpenCollapsible}
                setSheetIsOpen={setSheetIsOpen}
              />
            </SheetTrigger>

            <CreateNoteSheet setSheetIsOpen={setSheetIsOpen} />
          </Sheet>
        </SidebarGroupLabel>

        <CollapsibleContent
          className={`text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`}
        >
          <ScrollArea className="h-fit max-h-80 w-full ">
            <div className="pl-3.5">
              {userHasNotes &&
                allNotes.map(({ id, title }) => (
                  <Fragment key={id}>
                    <span className="w-[200px] truncate text-sm">{title}</span>
                    <Separator className="my-2" />
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
      </SidebarGroup>
    </Collapsible>
  );
};
