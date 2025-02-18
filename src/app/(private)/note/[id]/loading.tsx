import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex w-screen flex-col px-8 pt-10 lg:px-20">
      <h1 className={`text-xl font-bold lg:text-2xl`}>
        Nota: <br className={`lg:hidden`} /> <Skeleton className="h-10 w-1/5" />
      </h1>

      <section className={`mt-5 flex w-3/4 flex-col gap-10`}>
        <div className={`space-y-2`}>
          <span className={`text-sm font-medium text-muted-foreground`}>Título da nota:</span>
          <Skeleton className="h-10 w-full" />
        </div>
        <div className={`space-y-2`}>
          <span className={`text-sm font-medium text-muted-foreground`}>Conteúdo da nota:</span>
          <br />
          <Skeleton className="h-40 w-full" />
        </div>
      </section>
    </main>
  );
}
