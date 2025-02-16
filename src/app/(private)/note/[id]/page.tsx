import { getUsersFolders } from "@/actions/Folders";
import { getNoteById } from "@/actions/Notes";
import { NotePageFields } from "@/components/layouts/note/page-fields";
import { headers } from "next/headers";

export default async function Note() {
  const allFolders =
    (await getUsersFolders()).body?.filter(item => item.name !== "Todas as Notas") || [];
  const heads = headers();
  const pathname = heads.get("x-url") || "";
  const id = pathname.split("/").slice(-1)[0];

  const noteById = (await getNoteById(id)).body;

  return (
    <main className="flex w-screen flex-col px-8 pt-10 lg:px-20">
      <h1 className={`text-xl font-bold lg:text-2xl`}>
        Nota: <br className={`lg:hidden`} /> {noteById?.title}
      </h1>

      <NotePageFields allFolders={allFolders} noteById={noteById} />
    </main>
  );
}
