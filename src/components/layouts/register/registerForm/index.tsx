"use client";

import { TCreateUserBody } from "@/@types/actions/user";
import { registerUser } from "@/actions/User";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { formRegisterSchema, TFormRegisterSchema } from "./schemas";

export function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<TFormRegisterSchema>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: TFormRegisterSchema) {
    const { email, password, name } = values;

    const newObj: TCreateUserBody = {
      name,
      email,
      password,
    };

    const response = await registerUser(newObj);

    if (!response.ok) {
      return toast({ title: response.body.message, variant: "destructive" });
    }

    router.push("/login");
    return toast({ title: "Conta criada com sucesso", variant: "success" });
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-muted-foreground">Nome:</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-muted-foreground">Email:</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-muted-foreground">Senha:</FormLabel>
              <FormControl>
                <Input placeholder="Senha" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className={`w-full`} type="submit">
          Criar conta
        </Button>
      </form>
    </Form>
  );
}
