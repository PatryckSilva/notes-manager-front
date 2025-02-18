import { getFolderById } from "@/actions/Folders";
import { ChangeFolderName } from "@/components/layouts/folder/change-folder-name";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Folder() {
  const heads = headers();
  const pathname = heads.get("x-url") || "";
  const id = pathname.split("/").slice(-1)[0];

  const getFolderByIdResponse = await getFolderById(id);
  const currentFolder = getFolderByIdResponse.body;

  if (!getFolderByIdResponse.ok) {
    redirect("/dashboard");
  }

  return (
    <main className="flex w-screen flex-col px-8 pt-10 lg:px-20">
      <h1 className={`text-xl font-bold lg:text-2xl`}>
        Pasta: <br className={`lg:hidden`} /> {currentFolder?.name}
      </h1>

      {currentFolder && <ChangeFolderName currentFolder={currentFolder} />}

      <span className={`mt-2.5 font-bold text-muted-foreground lg:mt-5`}>Notas desta pasta:</span>
      {currentFolder && (
        <section className={`mt-5 flex w-full flex-wrap justify-center gap-10 md:justify-start`}>
          {currentFolder.notes?.map(note => (
            <Link
              className={`w-44 transition-all active:scale-95 active:shadow-none`}
              href={`/note/${note.id}`}
              key={note.id}
            >
              <Card>
                <CardHeader>
                  <CardTitle className={`truncate text-lg font-bold`}>{note.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`truncate text-sm`}>{note.content}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
