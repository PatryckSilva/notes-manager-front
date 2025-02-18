"use client";
import { logout } from "@/actions/User";
import { truncateText } from "@/utils/truncateText";
import { Loader } from "lucide-react";
import { memo, useState } from "react";

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
  const [isLoading, setisLoading] = useState(false);
  if (typeof userInfos === "string") {
    return null;
  }

  const logoutUser = async () => {
    setisLoading(true);
    try {
      await logout();
    } catch (e) {
      console.log(e);
    } finally {
      setisLoading(false);
    }
  };
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
        <DialogHeader className={`flex flex-col items-start gap-2 text-start`}>
          <DialogTitle className={`mb-4`}>Profile</DialogTitle>

          <Label>Name:</Label>

          <span>{userInfos.name}</span>

          <Label>Email:</Label>

          <span>{userInfos.email}</span>
        </DialogHeader>
        <DialogFooter className={`flex w-full flex-row items-center justify-end gap-2.5`}>
          <DialogClose asChild>
            <Button type="submit" variant={"ghost"}>
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={logoutUser} type="submit" variant={"destructive"}>
            {isLoading ? <Loader className={`animate-spin`} /> : "Logout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ProfileModal);
