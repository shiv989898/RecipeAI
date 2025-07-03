import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { FetchRecipeOutput } from "@/ai/flows/fetch-recipe";
import { Utensils, ListChecks } from "lucide-react";
import { InstructionStep } from "./InstructionStep";

interface RecipeCardProps {
  recipe: FetchRecipeOutput;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const instructions = recipe.instructions.split('\n').filter(line => line.trim() !== '');
  const ingredients = recipe.ingredients.split('\n').filter(line => line.trim() !== '');

  return (
    <Card className="w-full max-w-3xl animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="text-3xl md:text-4xl font-headline text-center">
          {recipe.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="flex items-center gap-2 text-2xl font-headline mb-3 text-primary">
            <Utensils className="size-6 text-accent" />
            Ingredients
          </h3>
          <ul className="list-disc list-inside space-y-1 pl-2 text-base">
            {ingredients.map((item, index) => (
              <li key={index}>{item.replace(/^- /, '')}</li>
            ))}
          </ul>
        </div>
        <Separator />
        <div>
          <h3 className="flex items-center gap-2 text-2xl font-headline mb-3 text-primary">
            <ListChecks className="size-6 text-accent" />
            Instructions
          </h3>
          <div className="space-y-1">
            {instructions.map((instruction, index) => (
              <InstructionStep key={index} step={index + 1} text={instruction.replace(/^\d+\.\s*/, '')} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
