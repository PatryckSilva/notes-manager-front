"use client";
import { logout } from "@/actions/User";
import { truncateText } from "@/utils/truncateText";
import { memo } from "react";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";

const ProfileModal = ({ userInfos }: { userInfos: { name: string; email: string } | string }) => {
  if (typeof userInfos === "string") {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`flex cursor-pointer items-center gap-2 rounded-t-xl border-t border-border py-3.5`}
        >
          <figure>
            <div className={`size-10 shrink-0 rounded-full bg-muted-foreground`} />
          </figure>
          <article className={`flex max-w-48 flex-col items-start gap-1 truncate`}>
            <span className={`text-base font-bold text-primary`}>
              {truncateText(userInfos.name, 20)}
            </span>
            <span className={`text-xs text-muted-foreground`}>
              {truncateText(userInfos.email, 30)}
            </span>
          </article>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className={`gap-2`}>
          <DialogTitle className={`mb-4`}>Profile</DialogTitle>

          <Label>Name:</Label>

          <span>{userInfos.name}</span>

          <Label>Email:</Label>

          <span>{userInfos.email}</span>
        </DialogHeader>
        <div className="grid gap-4 py-4"></div>
        <DialogFooter className={`flex flex-col items-start`}>
          <DialogClose asChild>
            <Button type="submit" variant={"ghost"}>
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={() => logout()} type="submit" variant={"destructive"}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ProfileModal);
