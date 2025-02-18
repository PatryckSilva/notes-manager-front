import { Skeleton } from "@/components/ui/skeleton";
//176 102
export default function Loading() {
  return (
    <main className="flex flex-col gap-5 px-20 pt-10">
      <h1 className={`text-xl font-bold lg:text-2xl`}>
        Pasta: <br className={`lg:hidden`} /> <Skeleton className="h-10 w-1/5" />
      </h1>

      <Skeleton className="h-10 w-full max-w-2xl" />

      <span className={`mt-2.5 font-bold text-muted-foreground lg:mt-5`}>Notas desta pasta:</span>
      <section className={`mt-5 flex w-full flex-wrap justify-center gap-10 md:justify-start`}>
        {Array.from({ length: 5 }, (_, index) => index).map((note: number) => (
          <Skeleton className="h-[102px] w-[176px]" key={note} />
        ))}
      </section>
    </main>
  );
}
