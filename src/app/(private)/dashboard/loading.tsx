import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col px-20 pt-10">
      <h1 className={`text-2xl font-bold`}>Todas as notas:</h1>
      <section className={`mt-5 flex w-full flex-wrap justify-center gap-10`}>
        {Array.from({ length: 5 }, (_, index) => index).map((note: number) => (
          <Skeleton className="h-[102px] w-[176px]" key={note} />
        ))}
      </section>
    </main>
  );
}
