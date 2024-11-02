"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormFieldComponent from "./FormFieldComponent";
import { registerSchema } from "@/utils/getFormSchema";
import { registerUser } from "@/app/api/userActions";
import { useRouter } from "next/navigation";

const formSchema = registerSchema;

export default function RegisterComponent() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    registerUser(values, router);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormFieldComponent
          form={form as unknown as UseFormReturn}
          name="username"
          label="Username"
          placeHolder="Username"
        />
        <FormFieldComponent
          form={form as unknown as UseFormReturn}
          name="email"
          label="Email"
          placeHolder="Email"
        />
        <FormFieldComponent
          form={form as unknown as UseFormReturn}
          name="password"
          label="Password"
          placeHolder="Password"
          type="password"
        />
        <FormFieldComponent
          form={form as unknown as UseFormReturn}
          name="confirmPassword"
          label="Confirm Password"
          placeHolder="Confirm Password"
          type="password"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
