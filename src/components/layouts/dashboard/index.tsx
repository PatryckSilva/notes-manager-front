"use client";

import { useSidebar } from "@/components/ui/sidebar";

export const NoNotesFoundButton = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className={`flex flex-col gap-2`}>
      <p className={`text-lg`}>Nenhuma nota encontrada.</p>
      <span>
        Crie uma nova nota{" "}
        <strong className={`cursor-pointer text-primary underline`} onClick={toggleSidebar}>
          aqui!
        </strong>
      </span>
    </div>
  );
};
