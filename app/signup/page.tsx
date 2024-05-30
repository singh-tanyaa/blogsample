"use client";

import {
  Form,
  FormField,
  FormLabel,
  FormDescription,
  FormMessage,
  FormItem,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "./components/loading";

const VALUES = ["Admin", "Writer", "Reviewer", "User"] as const;

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Please enter at least two characters" })
    .max(50),
  firstname: z.string().min(2, { message: "Please enter first name" }).max(50),
  lastname: z.string().min(2, { message: "Please enter last name" }).max(50),
  email: z.string().min(5, { message: "Please enter your email" }).email(),
  role: z.enum(VALUES),
  password: z.string().min(2, { message: "Please enter password" }).max(50),
  cnfpassword: z.string().min(2, { message: "Please re-enter password" }).max(50),
}) .refine((data) => data.password === data.cnfpassword, {
  message: "Passwords don't match",
  path: ["cnfpassword"],
});

interface SignupFormProps  {
  firstname: '',
  lastname: '',
  email: '',
  role: '',
  password: '',
  cnfpassword: ''
}

const Login:React.FC<SignupFormProps>= ({
  firstname,
  lastname,
  
})  => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      role: "Admin",
      password: '',
      cnfpassword: ''
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex h-auto w-full justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8  rounded-[5px] bg-transparent backdrop-blur-lg shadow-md border w-[350px] px-10 h-auto py-10 my-10"
        >
          <div className="flex w-full justify-center items-center mb-14">
            <span className="border-b-2 border-[#4b6bfb] font-semibold text-2xl">
              Sign Up
            </span>
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">UserName</FormLabel>
                <FormControl className="rounded-[5px] border-[1px] border-gray-300">
                  <Input placeholder="Enter your Username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="bg-[#4b6bfa]/80 h-[2px] rounded-[2px]" />
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">First Name</FormLabel>
                <FormControl className="rounded-[5px] border-[1px] border-gray-300">
                  <Input placeholder="Enter your first Name" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="bg-[#4b6bfa]/80  h-[2px]  rounded-[2px]" />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Last Name</FormLabel>
                <FormControl className="rounded-[5px] border-[1px] border-gray-300">
                  <Input placeholder="Enter your last Name" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="bg-[#4b6bfa]/80  h-[2px]   rounded-[2px]" />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl className="rounded-[5px] border-[1px] border-gray-300">
                  <Input placeholder="Enter your Email" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        
          <Separator className="bg-[#4b6bfa]/80  h-[2px]   rounded-[2px]" />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl className="rounded-[5px] border-[1px] border-gray-300">
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a role"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-gray-300 rounded-[5px]">
                    {VALUES.map((category, index) => (
                      <SelectItem key={index} value={category} className="hover:bg-white">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
            <Separator className="bg-[#4b6bfa]/80  h-[2px]   rounded-[2px]" />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Password</FormLabel>
                <FormControl className="rounded-[5px] border-[1px] border-gray-300">
                  <Input placeholder="Enter your Password" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
            <Separator className="bg-[#4b6bfa]/80  h-[2px]   rounded-[2px]" />
          <FormField
            control={form.control}
            name="cnfpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Confirm Password</FormLabel>
                <FormControl className="rounded-[5px] border-[1px] border-gray-300">
                  <Input placeholder="Re-enter your Password" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="border bg-[#4b6bfb] text-white hover:bg-[#4b6bfa]/80 transition-all duration-300"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;


