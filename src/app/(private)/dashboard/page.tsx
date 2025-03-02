import { getAllUserNotes } from "@/actions/Notes";
import { NoNotesFoundButton } from "@/components/layouts/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function Home() {
  const allUserNotes = await getAllUserNotes();
  const allNotes = Array.isArray(allUserNotes.body) ? allUserNotes.body : [];
  return (
    <main className="flex flex-col px-20 pt-10">
      {allNotes?.length > 0 && (
        <h1 className={`text-2xl font-bold`}>Todas as notas:</h1>
      )}

      <section
        className={`mt-5 flex w-full flex-wrap justify-center gap-10 md:justify-start`}
      >
        {allNotes.map((note) => (
          <Link
            className={`w-44 transition-all active:scale-95 active:shadow-none`}
            href={`/note/${note.id}`}
            key={note.id}
          >
            <Card>
              <CardHeader>
                <CardTitle className={`truncate text-lg font-bold`}>
                  {note.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`truncate text-sm`}>{note.content}</p>
              </CardContent>
            </Card>
          </Link>
        ))}

        {allNotes?.length === 0 && <NoNotesFoundButton />}
      </section>
    </main>
  );
}
