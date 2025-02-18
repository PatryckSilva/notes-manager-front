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
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { formLoginSchema, TFormLoginSchema } from "./schemas";

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<TFormLoginSchema>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: TFormLoginSchema) {
    try {
      setIsLoading(true);
      const { email, password } = values;

      const newObj: TLoginUserBody = {
        email,
        password,
      };

      const response = await login({ data: newObj });

      if (!response.ok) {
        return toast({ title: response.body.message, variant: "destructive" });
      }

      return toast({ title: "Login efetuado com sucesso", variant: "success" });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      router.push("/dashboard");
    }
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
                <PasswordInput placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className={`w-full`} type="submit">
          {isLoading ? <Loader className={`animate-spin`} /> : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
