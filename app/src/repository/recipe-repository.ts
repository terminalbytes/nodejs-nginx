import { Recipe } from "@db/models/Recipe";
import { RecipeRating } from "@db/models/RecipeRating";
const MAXIMUM_FETCH_LIMIT = 100;

const getRecipes = async (limit: number, offset: number) => {
    limit = Math.min(limit, MAXIMUM_FETCH_LIMIT);
    const recipes = await Recipe.findAll({
        limit,
        offset,
    });
    return recipes;
};

const getRecipeById = async (id: number) => {
    const recipe = await Recipe.findByPk(id);
    return recipe;
};

const addRecipe = async (params: Partial<Recipe>) => {
    const recipe = new Recipe({
        ...params,
    });

    return recipe.save();
};

const modifyRecipe = async (id: number, params: Partial<Recipe>) => {
    await Recipe.update(params, {
        where: {
            id,
        },
    });
    const recipe = await Recipe.findByPk(id);
    return recipe;
};

const softDeleteRecipe = async (id: number) => {
    await Recipe.update({
        deleted: true,
    }, {
        where: {
            id,
        },
    });
    const recipe = await Recipe.findByPk(id);
    return recipe;
};

const createRecipeRating = async (recipeId: number, rating: number) => {
    const recipe = await Recipe.findByPk(recipeId);
    if (recipe) {
        const newRating = new RecipeRating({
            recipeId,
            rating,
        });
        await newRating.save();
    } else {
        throw new Error("Invalid recipe id");
    }
};

export { getRecipes, getRecipeById, addRecipe, modifyRecipe, softDeleteRecipe, createRecipeRating };
