"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChefHat, Loader2, NotebookPen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import type { FetchRecipeOutput } from "@/ai/flows/fetch-recipe";
import { getRecipe } from "./actions";
import { RecipeCard } from "@/components/RecipeCard";
import { Skeleton } from "@/components/ui/skeleton";

const FormSchema = z.object({
  dishName: z.string().min(2, {
    message: "Dish name must be at least 2 characters.",
  }),
});

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [recipe, setRecipe] = useState<FetchRecipeOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dishName: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setRecipe(null);
    startTransition(async () => {
      const result = await getRecipe(data.dishName);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Oh no! Something went wrong.",
          description: result.error,
        });
      } else {
        setRecipe(result.data);
      }
    });
  }

  const RecipeSkeleton = () => (
    <div className="w-full max-w-3xl space-y-4 rounded-lg border bg-card p-6">
        <Skeleton className="h-12 w-3/4 mx-auto" />
        <div className="space-y-6 pt-6">
            <div className="space-y-3">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-[1px] w-full" />
            <div className="space-y-3">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-3xl">
        <header className="flex flex-col items-center text-center mb-8">
            <ChefHat className="size-16 text-primary" />
            <h1 className="text-4xl sm:text-5xl font-headline font-bold mt-2">
                RecipeAI
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
                What delicious dish are you craving today?
            </p>
        </header>

        <section className="mb-12">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 items-start">
                <FormField
                control={form.control}
                name="dishName"
                render={({ field }) => (
                    <FormItem className="flex-grow">
                    <FormControl>
                        <Input placeholder="e.g., Spaghetti Carbonara" {...field} className="text-base" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" disabled={isPending} className="h-10">
                {isPending ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    "Get Recipe"
                )}
                </Button>
            </form>
            </Form>
        </section>

        <section className="flex justify-center">
            {isPending && <RecipeSkeleton />}
            {recipe && <RecipeCard recipe={recipe} />}
            {!isPending && !recipe && (
                 <div className="text-center text-muted-foreground mt-8 animate-in fade-in-50 duration-500">
                    <NotebookPen className="size-24 mx-auto opacity-70" />
                    <p className="mt-4 text-xl font-medium">Your culinary adventure awaits!</p>
                    <p>Enter a dish above to get started.</p>
                </div>
            )}
        </section>
      </div>
    </main>
  );
}
