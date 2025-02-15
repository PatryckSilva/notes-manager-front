"use client";

import { ChevronDown, InboxIcon } from "lucide-react";
import React, { Fragment } from "react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { SidebarGroup, SidebarGroupLabel } from "../ui/sidebar";

export const SidebarAllNotesCollapsible = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

  return (
    <Collapsible onOpenChange={setIsOpen} open={isOpen}>
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className={` cursor-pointer hover:bg-muted`}>
            <span className={`flex w-full items-center justify-between gap-1.5`}>
              <InboxIcon className={`size-5`} />
              <span className="font-medium">Todas as Notas</span>
              <ChevronDown
                className={`ml-auto transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </span>
          </CollapsibleTrigger>
        </SidebarGroupLabel>

        <CollapsibleContent
          className={`text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2`}
        >
          <ScrollArea className="h-80 w-full ">
            <div className="p-4">
              {tags.map(tag => (
                <Fragment key={tag}>
                  <div className="text-sm" key={tag}>
                    {tag}
                  </div>
                  <Separator className="my-2" />
                </Fragment>
              ))}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
};
