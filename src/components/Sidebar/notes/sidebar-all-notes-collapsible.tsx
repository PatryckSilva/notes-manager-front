"use client";

import { INote } from "@/@types/actions/notes";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarGroupContent } from "@/components/ui/sidebar";
import Link from "next/link";
import React, { Fragment } from "react";

import { AddNotes } from "./add-notes";

export const SidebarAllNotesCollapsible = ({ allNotes = [] }: { allNotes?: INote[] }) => {
  const userHasNotes = allNotes.length > 0;
  const [isOpenCollapsible, setIsOpenCollapsible] = React.useState(true);

  return (
    <Collapsible onOpenChange={setIsOpenCollapsible} open={isOpenCollapsible}>
      <AddNotes isOpenCollapsible={isOpenCollapsible} setIsOpenCollapsible={setIsOpenCollapsible} />

      <SidebarGroupContent className={`${isOpenCollapsible ? "border-l border-border " : ""}`}>
        <CollapsibleContent
          className={`text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`}
        >
          <ScrollArea className="h-fit max-h-80 w-full ">
            <>
              {userHasNotes &&
                allNotes.map(note => (
                  <Fragment key={note.id}>
                    <Link
                      className={`flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-muted`}
                      href={`/note/${note.id}`}
                    >
                      <span className="w-[200px] truncate text-sm">{note.title}</span>
                    </Link>
                    {allNotes.indexOf(note) !== allNotes.length - 1 && <Separator />}
                  </Fragment>
                ))}

              {!userHasNotes && (
                <span className={`text-xs font-medium text-muted-foreground`}>
                  Você ainda não tem nenhuma nota.
                </span>
              )}
            </>
          </ScrollArea>
        </CollapsibleContent>
      </SidebarGroupContent>
    </Collapsible>
  );
};
