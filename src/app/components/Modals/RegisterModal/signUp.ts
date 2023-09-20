import { z } from 'zod';

export const signup = z
  .object({
    email: z
      .string()
      .email('Email inválido')
      .min(8, 'O email precisa ter no mínimo 6 caracteres'),
    password: z.string().min(6, 'A senha deve possuir no mínimo 6 caracteres'),
    username: z.string().min(3, 'Seu nome deve ter no mínimo 3 caracteres'),
  })
  .required();
