import { IFolder } from "@/@types/actions/folders";
import { CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Collapsible } from "@radix-ui/react-collapsible";
import { ChevronDown, Folder } from "lucide-react";
import Link from "next/link";

export const SidebarAllFoldersCollapsible = ({ allFolders }: { allFolders: IFolder[] }) => {
  return (
    <SidebarMenu>
      {allFolders?.map(folder => (
        <Collapsible key={folder.id}>
          <CollapsibleTrigger
            className={`w-full cursor-pointer border-b border-border data-[state=open]:border-l   `}
          >
            <SidebarMenuItem className=" flex w-full items-center hover:bg-muted">
              <SidebarMenuButton asChild>
                <span>
                  <Folder />
                  <span className="font-medium">{folder.name}</span>
                </span>
              </SidebarMenuButton>
              <ChevronDown className="ml-auto transition-transform" />
            </SidebarMenuItem>
          </CollapsibleTrigger>

          {folder.notes.length > 0 ? (
            folder.notes.map(note => (
              <CollapsibleContent
                className="text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                key={note.id}
              >
                <ScrollArea className="h-fit max-h-40 w-full overflow-auto">
                  <div className="border-l border-border pl-3.5">
                    <Link
                      className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-muted"
                      href={`/note/${note.id}`}
                    >
                      <span className="w-[200px] truncate text-sm">{note.title}</span>
                    </Link>
                    {folder.notes.indexOf(note) !== folder.notes.length - 1 && <Separator />}
                  </div>
                </ScrollArea>
              </CollapsibleContent>
            ))
          ) : (
            <CollapsibleContent className="p-2 text-xs font-medium text-muted-foreground">
              Você ainda não tem nenhuma nota.
            </CollapsibleContent>
          )}
        </Collapsible>
      ))}
    </SidebarMenu>
  );
};
