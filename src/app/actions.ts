"use server";
import { fetchRecipe, type FetchRecipeOutput } from "@/ai/flows/fetch-recipe";

export async function getRecipe(dishName: string): Promise<{ data: FetchRecipeOutput | null, error: string | null }> {
    if (!dishName || dishName.length < 2) {
        return { data: null, error: 'Please enter a valid dish name (at least 2 characters).' };
    }

    try {
        const recipe = await fetchRecipe({ dishName });
        if (!recipe.title || !recipe.ingredients || !recipe.instructions) {
             return { data: null, error: "Sorry, I couldn't find a complete recipe for that. Please try another dish." };
        }
        return { data: recipe, error: null };
    } catch (e) {
        console.error(e);
        return { data: null, error: "Sorry, I couldn't find a recipe for that. Please try another dish." };
    }
}
