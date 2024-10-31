"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormFieldComponent from "./FormFieldComponent";
import { loginUser } from "@/utils/userActions";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formSchema = z
  .object({
    usernameOrEmail: z
      .string()
      .min(4, { message: "Username must be at least 4 characters." })
      .refine((val) => {
        if (val.includes('@')) {
          return emailRegex.test(val);
        }
        return /^[a-zA-Z0-9_]*$/.test(val);
      }, {
        message: "Must be a valid email or a username with only letters, numbers, and underscores.",
      }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

export default function LoginComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormFieldComponent
          form={form as unknown as UseFormReturn}
          name="usernameOrEmail"
          label="Login with username or email."
          placeHolder="Enter your username or email"
        />
        <FormFieldComponent
          form={form as unknown as UseFormReturn}
          name="password"
          label="Password"
          placeHolder="Password"
          type="password"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
