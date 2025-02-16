import { getNoteById } from "@/actions/Notes";
import { NotePageFields } from "@/components/layouts/note/page-fields";
import { headers } from "next/headers";

export default async function Note() {
  const heads = headers();
  const pathname = heads.get("x-url") || "";
  const id = pathname.split("/").slice(-1)[0];

  const noteById = (await getNoteById(id)).body;

  return (
    <main className="flex w-screen flex-col px-20 pt-10">
      <h1 className={`text-2xl font-bold`}>Nota: {noteById?.title}</h1>

      <section className={`w-3/4`}>
        <NotePageFields noteById={noteById} />
      </section>
    </main>
  );
}
