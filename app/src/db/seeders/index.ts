import { getRandInteger } from "@utils/common-utils";
import { logger } from "@utils/logger";
import { Recipe } from "../models/Recipe";
import { RecipeRating } from "../models/RecipeRating";
import recipesJson from "./seed-recipes.json";

export const seedDatabase = async () => {
    try {
        let promises = [];

        // Seed the database with recipes
        for (const recipeJson of recipesJson) {
            const { id, ...dbParams } = recipeJson;
            const recipe = new Recipe({
                ...dbParams,
            });
            promises.push(recipe.save());
        }
        await Promise.all(promises);
        logger.info({ length: recipesJson.length }, "Seeded recipes");

        // Seed the database with ratings
        promises = [];
        let count = 0;
        for (const recipeJson of recipesJson) {
            for (let r = 1; r < getRandInteger(5, 30); r++) {
                const rating = new RecipeRating({
                    recipeId: recipeJson.id + 1,
                    rating: getRandInteger(1, 5),
                });
                promises.push(rating.save());
                count++;
            }
        }
        await Promise.all(promises);
        logger.info({ count }, "Seeded ratings");
    } catch (error: any) {
        logger.warn({ error: error.name }, "Database is probably already seeded");
    }
};