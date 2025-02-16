"use client";

import { ChevronDown, FileEdit, FilePlus, InboxIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { CollapsibleTrigger } from "../ui/collapsible";

export const SidebarAllNotesCollapsibleTrigger = ({
  isOpenCollapsible,
  handleOpenCollapsible,
  setSheetIsOpen,
}: {
  setSheetIsOpen: Dispatch<SetStateAction<boolean>>;
  handleOpenCollapsible: VoidFunction;
  isOpenCollapsible: boolean;
}) => {
  const handleOpenCreateNote = (event: React.MouseEvent) => {
    event.preventDefault();

    setSheetIsOpen(true);
  };

  const blockSheetOpenByLeftClick = (event: React.MouseEvent) => {
    event.preventDefault();
    handleOpenCollapsible();
  };
  return (
    <CollapsibleTrigger
      asChild
      className={`cursor-pointer rounded-md p-2 hover:bg-muted`}
      onClick={blockSheetOpenByLeftClick}
      onContextMenu={handleOpenCreateNote}
    >
      <div className={`flex w-full items-center justify-between gap-1.5  `}>
        <aside className="flex items-center gap-1.5">
          <InboxIcon className={`size-5`} />
          <span className="text-xs font-medium">Todas as Notas</span>
        </aside>
        <aside className="flex items-center gap-1">
          <button onClick={handleOpenCreateNote}>
            <span className={`sr-only`}>Criar nova Nota</span>
            <FileEdit className={`size-4 `} />
          </button>

          <button onClick={handleOpenCreateNote}>
            <span className={`sr-only`}>Criar nova Nota</span>
            <FilePlus className={`size-4 `} />
          </button>
          <ChevronDown
            className={`ml-auto transition-transform ${isOpenCollapsible ? "rotate-180" : ""}`}
          />
        </aside>
      </div>
    </CollapsibleTrigger>
  );
};
