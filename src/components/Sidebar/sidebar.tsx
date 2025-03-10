import { IUserPublicInfo } from "@/@types/actions/user";
import { getUsersFolders } from "@/actions/Folders";
import { getAllUserNotes } from "@/actions/Notes";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronDown, Folder } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Fragment } from "react";

import LogoSVG from "../svgs/logo";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { AddFolder } from "./folders/add-folder";
import { SidebarAllNotesCollapsible } from "./notes/sidebar-all-notes-collapsible";
import ProfileModal from "./profile/profile-modal";

export async function AppSidebar() {
  const cookieStore = await cookies();
  const userInfos: IUserPublicInfo | undefined = cookieStore.get("user_infos")
    ?.value
    ? JSON.parse(cookieStore.get("user_infos")?.value || "{}")
    : undefined;

  const allUserNotes = await getAllUserNotes();
  const userHasNotes =
    Array.isArray(allUserNotes.body) && allUserNotes.body.length > 0;
  const allNotes = Array.isArray(allUserNotes.body) ? allUserNotes.body : [];

  const userFolders = (await getUsersFolders()).body || [];
  const customFolders = userFolders || [];
  console.log(`userFolders`, userFolders);
  return (
    <Sidebar className={`!bg-white`}>
      <Link href={`/`} passHref>
        <SidebarHeader className={`flex-row items-center gap-2.5 p-5`}>
          <LogoSVG className={`size-14`} />
          <span className={`flex flex-col text-2xl font-bold text-primary `}>
            Notes <span className={`-mt-1.5`}>Manager</span>
          </span>
        </SidebarHeader>
      </Link>

      <SidebarContent>
        <SidebarGroup>
          <SidebarAllNotesCollapsible allFolders={customFolders}>
            <CollapsibleContent
              className={`text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`}
            >
              <ScrollArea className="h-fit max-h-80 w-full overflow-auto">
                <>
                  {userHasNotes &&
                    allNotes.map((note) => (
                      <Fragment key={note.id}>
                        <Link
                          className={`flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-muted`}
                          href={`/note/${note.id}`}
                        >
                          <span className="w-[200px] truncate text-sm">
                            {note.title}
                          </span>
                        </Link>
                        {allNotes.indexOf(note) !== allNotes.length - 1 && (
                          <Separator />
                        )}
                      </Fragment>
                    ))}

                  {!userHasNotes && (
                    <div className={`p-2`}>
                      <span
                        className={`text-xs font-medium text-muted-foreground `}
                      >
                        Você ainda não tem nenhuma nota.
                      </span>
                    </div>
                  )}
                </>
              </ScrollArea>
            </CollapsibleContent>
          </SidebarAllNotesCollapsible>
        </SidebarGroup>

        <SidebarGroup className="border-t border-border">
          <SidebarGroupLabel>
            <span
              className={`flex w-full items-center justify-between gap-1.5  `}
            >
              <span className="flex items-center gap-1.5">
                <span className="text-xs font-medium">Pastas</span>
              </span>
              <AddFolder />
            </span>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {customFolders?.map((folder) => (
                <Collapsible key={folder.id}>
                  <CollapsibleTrigger
                    className={`w-full cursor-pointer border-b border-border data-[state=open]:border-l   `}
                  >
                    <SidebarMenuItem className=" flex w-full items-center hover:bg-muted">
                      <SidebarMenuButton asChild>
                        <span>
                          <Folder />
                          <Link
                            className="text-xs font-medium underline"
                            href={`/folder/${folder.id}`}
                          >
                            {folder.name}
                          </Link>
                        </span>
                      </SidebarMenuButton>
                      <ChevronDown className={"ml-auto transition-transform"} />
                    </SidebarMenuItem>
                  </CollapsibleTrigger>

                  {folder.notes.length > 0 ? (
                    folder.notes.map((note) => (
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
                              <span className="w-[200px] truncate text-sm">
                                {note.title}
                              </span>
                            </Link>
                            {folder.notes.indexOf(note) !==
                              folder.notes.length - 1 && <Separator />}
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {userInfos && (
        <SidebarFooter>
          <ProfileModal userInfos={userInfos} />
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
