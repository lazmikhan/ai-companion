"use client";
import { Category, Companion } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import CloudUpload from "./CloudUpload";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Textarea } from "./ui/textarea";
import { Wand2 } from "lucide-react";

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  instructions: z.string().min(1, {
    message: "Instructions is required",
  }),
  seed: z.string().min(1, {
    message: "Seed is required",
  }),
  src: z.string().min(1, {
    message: "Src is required",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
});

export default function CompanionForm({
  initialData,
  categories,
}: CompanionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });
  const isLoading = form.formState.isSubmitting;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const PREAMBLE =
    "You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.";
  const SEED = `Human: Hi Elon, how's your day been?
   Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you? 

  Human: Just a regular day for me. How's the progress with Mars colonization? 
  Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.
  
  Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
  Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live. 
   
   Human: It's fascinating to see your vision unfold. Anu new projects or innovations you're excited about?
  Elon: Absolutely! But right now I am particularly excited about Neural links. It has he potential`;

  return (
    <div className="h-full p-4 mx-auto max-w-3xl   space-y-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full ">
            <div>
              <h3 className="text-lg font-medium">General Information</h3>
              <p className="text-sm text-muted-foreground">
                General Information about you companion
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>

          <div className="flex justify-center">
            <FormField
              name="src"
              render={({ field }) => (
                <FormItem className="flex flex-col item-center justify-center space-y-4 ">
                  <FormControl>
                    <CloudUpload
                      disabled={isLoading}
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem className=" col-span-2 md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Elon Musk"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI companion will be named
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem className=" col-span-2 md:col-span-1">
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex : CEO & Founder of Tesla & SpaceX"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short Description for your AI companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="categoryId"
              render={({ field }) => (
                <FormItem className=" col-span-2 md:col-span-1">
                  <FormLabel>Category</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue
                          placeholder="Select a Category"
                          defaultValue={field.value}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Select a Category for your ai companion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <div>
            <div className="w-full">
              <h3>Configuration</h3>
              <p className="text-xs text-muted-foreground">
                Detailed Instructions for the AI behaviour
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="instructions"
            render={({ field }) => (
              <FormItem className=" col-span-2 md:col-span-1">
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                   rows={7}
                    placeholder={PREAMBLE}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your companion&apos;s backstory and revelant details
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
                  <FormField
            name="seed"
            render={({ field }) => (
              <FormItem className=" col-span-2 md:col-span-1">
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea  className="resize-none"
                    placeholder={SEED}
                    rows={7}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your companion&apos;s backstory and revelant details
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <div>
            <Button size="lg" disabled={isLoading}>{initialData?"Edit your Companion":"Create your Companion"}
            <Wand2 className="w-4 h-4 ml-2"></Wand2>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
