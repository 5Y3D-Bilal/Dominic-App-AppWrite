import * as z from "zod";
export const SignupValidation = z.object({
  username: z.string().min(2, { message: "too Short Username" }),
  name: z.string().min(2, { message: "too Short Name" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be longer then 8 letters" }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be longer then 8 letters" }),
});

export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});