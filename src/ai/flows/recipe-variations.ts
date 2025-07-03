'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating recipe variations based on user input.
 *
 * recipeVariations - A function that takes a recipe and a variation request and returns a modified recipe.
 * RecipeVariationsInput - The input type for the recipeVariations function.
 * RecipeVariationsOutput - The return type for the recipeVariations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecipeVariationsInputSchema = z.object({
  originalRecipe: z
    .string()
    .describe('The original recipe to be modified.'),
  variationRequest: z
    .string()
    .describe('The desired variation to apply to the recipe (e.g., vegetarian, spicy).'),
});
export type RecipeVariationsInput = z.infer<typeof RecipeVariationsInputSchema>;

const RecipeVariationsOutputSchema = z.object({
  modifiedRecipe: z
    .string()
    .describe('The modified recipe incorporating the requested variation.'),
});
export type RecipeVariationsOutput = z.infer<typeof RecipeVariationsOutputSchema>;

export async function recipeVariations(input: RecipeVariationsInput): Promise<RecipeVariationsOutput> {
  return recipeVariationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recipeVariationsPrompt',
  input: {schema: RecipeVariationsInputSchema},
  output: {schema: RecipeVariationsOutputSchema},
  prompt: `You are a recipe modification expert. Given the original recipe and a variation request, modify the recipe accordingly.

Original Recipe: {{{originalRecipe}}}

Variation Request: {{{variationRequest}}}

Modified Recipe:`,
});

const recipeVariationsFlow = ai.defineFlow(
  {
    name: 'recipeVariationsFlow',
    inputSchema: RecipeVariationsInputSchema,
    outputSchema: RecipeVariationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
