'use server';

/**
 * @fileOverview This file defines a Genkit flow for fetching a recipe based on a dish name.
 *
 * The flow takes a dish name as input and returns a recipe including ingredients and instructions.
 * @fileOverview A recipe generation AI agent.
 *
 * - fetchRecipe - A function that handles the recipe generation process.
 * - FetchRecipeInput - The input type for the fetchRecipe function.
 * - FetchRecipeOutput - The return type for the fetchRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FetchRecipeInputSchema = z.object({
  dishName: z.string().describe('The name of the dish to generate a recipe for.'),
});
export type FetchRecipeInput = z.infer<typeof FetchRecipeInputSchema>;

const FetchRecipeOutputSchema = z.object({
  title: z.string().describe('The title of the recipe.'),
  ingredients: z.string().describe('A list of ingredients for the recipe.'),
  instructions: z.string().describe('Step-by-step instructions for preparing the recipe.'),
});
export type FetchRecipeOutput = z.infer<typeof FetchRecipeOutputSchema>;

export async function fetchRecipe(input: FetchRecipeInput): Promise<FetchRecipeOutput> {
  return fetchRecipeFlow(input);
}

const fetchRecipePrompt = ai.definePrompt({
  name: 'fetchRecipePrompt',
  input: {schema: FetchRecipeInputSchema},
  output: {schema: FetchRecipeOutputSchema},
  prompt: `You are a recipe assistant that provides detailed recipes, including ingredients and instructions, based on the dish name provided by the user.

  Provide a recipe for the following dish: {{{dishName}}}

  Format the output as follows:
  title: [Recipe Title]
  ingredients: [List of ingredients]
  instructions: [Step-by-step instructions]
  `,
});

const fetchRecipeFlow = ai.defineFlow(
  {
    name: 'fetchRecipeFlow',
    inputSchema: FetchRecipeInputSchema,
    outputSchema: FetchRecipeOutputSchema,
  },
  async input => {
    const {output} = await fetchRecipePrompt(input);
    return output!;
  }
);
