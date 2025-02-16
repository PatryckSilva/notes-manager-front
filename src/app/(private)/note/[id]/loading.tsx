import Loader from "@/components/ui/loader";

export default function Loading() {
  return (
    <main className={`flex h-dvh w-screen items-center justify-center`}>
      <Loader />
    </main>
  );
}
