"use client";

import React from "react";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
type Props = {};
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z.string().min(1, "Title is required"),
  password: z.string().min(1, "Title is required"),
});

const LoginPage = (props: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  console.log(isSubmitting, isValid);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 items-center">
        <div className="mt-[200px]">
          <div>
            <h1 className="text-2xl text-center font-bold">Login</h1>
            <Form {...form}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  form.handleSubmit(onSubmit);
                }}
                className="space-y-8 mt-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="roshan@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            disabled={isSubmitting}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <div className="flex items-center  ">
                  <Button type="submit" className="w-[400px]">
                    Login
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
