"use client";

import { IFolder } from "@/@types/actions/folders";
import { Collapsible } from "@/components/ui/collapsible";
import { SidebarGroupContent } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

import { AddNotes } from "./add-notes";

export const SidebarAllNotesCollapsible = ({
  children,
  allFolders,
}: {
  children: ReactNode;
  allFolders: IFolder[];
}) => {
  const [isOpenCollapsible, setIsOpenCollapsible] = React.useState(true);
  return (
    <Collapsible onOpenChange={setIsOpenCollapsible} open={isOpenCollapsible}>
      <AddNotes
        allFolders={allFolders}
        isOpenCollapsible={isOpenCollapsible}
        setIsOpenCollapsible={setIsOpenCollapsible}
      />

      <SidebarGroupContent className={`${isOpenCollapsible ? "border-l border-border " : ""}`}>
        {children}
      </SidebarGroupContent>
    </Collapsible>
  );
};
