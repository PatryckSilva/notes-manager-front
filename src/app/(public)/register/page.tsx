import { RegisterForm } from "@/components/layouts/register/registerForm";
import LogoSVG from "@/components/svgs/logo";
import Link from "next/link";
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function Register() {
  await delay(10000);

  return (
    <main className={`flex h-dvh w-screen items-center justify-center`}>
      <section className={`flex h-5/6 w-10/12 rounded-sm bg-primary`}>
        <aside className="login_gradient hidden size-full flex-col items-center justify-center rounded-l-sm border border-primary lg:flex lg:w-1/2">
          <LogoSVG className={`size-80`} />
        </aside>

        <aside className="flex size-full flex-col items-center justify-between rounded-r-sm border border-border bg-white p-10 lg:w-1/2">
          <article className={`flex items-center gap-5`}>
            <LogoSVG className={`size-16`} />
            <span className={`flex flex-col text-2xl font-bold text-secondary-foreground `}>
              Notes <span className={`-mt-1.5`}>Manager</span>
            </span>
          </article>

          <div className={`flex flex-col gap-5`}>
            <span className={`text-left md:text-center`}>
              <h1 className={`mb-1 text-3xl font-bold`}>Bem-vindo!</h1>
              <span className={`font-semibold text-muted-foreground`}>
                Por favor, insira suas informações para criar sua conta.
              </span>
            </span>

            <section className="max-w-md">
              <RegisterForm />
            </section>
          </div>

          <span className={`font-medium text-muted-foreground`}>
            Já possui uma conta?{" "}
            <Link className={`text-primary underline`} href={"/login"}>
              Acesse Aqui!
            </Link>
          </span>
        </aside>
      </section>
    </main>
  );
}
