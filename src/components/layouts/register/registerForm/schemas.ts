import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export const formRegisterSchema = z.object({
  name: z
    .string({ message: "O nome é obrigatório" })
    .min(3, "O nome deve conter pelo menos 3 caracteres."),
  email: z.string().email("Insira um email válido."),
  password: z
    .string()
    .regex(
      passwordRegex,
      "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
    ),
});

export type TFormRegisterSchema = z.infer<typeof formRegisterSchema>;
