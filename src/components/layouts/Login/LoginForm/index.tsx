"use client";

import { TLoginUserBody } from "@/@types/actions/user";
import { login } from "@/actions/User";
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

import { formLoginSchema, TFormLoginSchema } from "./schemas";

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<TFormLoginSchema>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: TFormLoginSchema) {
    const { email, password } = values;

    const newObj: TLoginUserBody = {
      email,
      password,
    };

    const response = await login({ data: newObj });

    if (!response.ok) {
      return toast({ title: response.body.message, variant: "destructive" });
    }

    router.push("/");
    return toast({ title: "Login efetuado com sucesso", variant: "success" });
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                <Input placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className={`w-full`} type="submit">
          Log in
        </Button>
      </form>
    </Form>
  );
}
