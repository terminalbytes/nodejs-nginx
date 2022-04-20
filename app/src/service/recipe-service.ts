import { addRecipe, createRecipeRating, getRecipeById, getRecipes, modifyRecipe, softDeleteRecipe } from "@repository/recipe-repository";
import { Request } from "@routes/index";
import { failureResponseWrapper, successResponseWrapper } from "@utils/common-utils";
import { ErrorMessages, HTTPStatus } from "@utils/constants";
import { logger } from "@utils/logger";

const listRecipes = async (req: Request, params: Record<string, unknown>) => {
    logger.debug({ query: req.query, params }, "Received request for listRecipes");
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    const recipes = await getRecipes(limit, offset);
    return successResponseWrapper({ count: recipes?.length, limit, offset, recipes });
};

const getRecipe = async (req: Request, params: Record<string, unknown>) => {
    logger.debug({ query: req.query, params }, "Received request for getRecipe");
    const recipeId = parseInt(params.id as string, 10) || undefined;
    if (!recipeId) {
        throw new Error("Invalid recipe id");
    }
    const recipe = await getRecipeById(recipeId);
    return successResponseWrapper({ recipe });
};

const createRecipe = async (req: Request, params: Record<string, unknown>) => {
    logger.debug({ body: req.body, params }, "Received request for createRecipe");
    const recipe = req?.body;
    if (!recipe) {
        return failureResponseWrapper({ message: ErrorMessages.RecipeRequired, code: HTTPStatus.UnprocessableEntity });
    }
    const addedRecipe = await addRecipe(recipe);
    return successResponseWrapper({ recipe: addedRecipe });
};

const updateRecipe = async (req: Request, params: Record<string, unknown>) => {
    logger.debug({ body: req.body, params }, "Received request for updateRecipe");
    const recipe = req?.body;
    const recipeId = params.id ? parseInt(params.id as string, 10) : undefined;
    if (!recipe || !recipeId) {
        return failureResponseWrapper({ message: ErrorMessages.RecipeRequired, code: HTTPStatus.BadRequest });
    }
    const modifiedRecipe = await modifyRecipe(recipeId, recipe);
    return successResponseWrapper({ recipe: modifiedRecipe });
};

const deleteRecipe = async (req: Request, params: Record<string, unknown>) => {
    logger.debug({ params }, "Received request for deleteRecipe");
    const recipeId = params.id ? parseInt(params.id as string, 10) : undefined;
    if (!recipeId) {
        return failureResponseWrapper({ message: ErrorMessages.RecipeRequired, code: HTTPStatus.BadRequest });
    }
    const deletedRecipe = await softDeleteRecipe(recipeId);
    return successResponseWrapper({ recipe: deletedRecipe });
};

const rateRecipe = async (req: Request, params: Record<string, unknown>) => {
    logger.debug({ body: req.body, params }, "Received request for rateRecipe");
    const rating = req?.body?.rating ? parseInt(req.body.rating as string, 10) : undefined;
    const recipeId = params.id ? parseInt(params.id as string, 10) : undefined;
    if (!recipeId || !rating) {
        return failureResponseWrapper({ message: ErrorMessages.RecipeRequired, code: HTTPStatus.BadRequest });
    }
    const deletedRecipe = await createRecipeRating(recipeId, rating);
    return successResponseWrapper({ recipe: deletedRecipe });
};

export { listRecipes, getRecipe, createRecipe, updateRecipe, deleteRecipe, rateRecipe };
