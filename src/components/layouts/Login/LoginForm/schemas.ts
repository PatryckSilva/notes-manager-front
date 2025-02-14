import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export const formLoginSchema = z.object({
  email: z.string().email("Por favor, insira um email válido."),
  password: z
    .string()
    .regex(
      passwordRegex,
      "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
    ),
});

export type TFormLoginSchema = z.infer<typeof formLoginSchema>;
