import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

type Params = {
  form: UseFormReturn;
  name: string;
  label: string;
  placeHolder: string;
  type?: string;
};

function FormFieldComponent({ form, name, label, placeHolder, type}: Params) {
  const [revealPassword, setRevealPassword] = useState(false);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={`input${name}`}>{label}</FormLabel>
          <FormControl>
            {!type ? (
              <Input id={`input${name}`} placeholder={placeHolder} {...field} />
            ) : (
              <div className="relative">
                <Input
                  id={`input${name}`}
                  type={revealPassword ? "text": type}
                  placeholder={placeHolder}
                  {...field}
                />
                <button
                  onClick={(evt) => {
                    evt.preventDefault();
                    setRevealPassword(prev => !prev);
                  }}
                  className="absolute top-1/2 right-0 transform -translate-y-1/2"
                >
                  Reveal
                </button>
              </div>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldComponent;
