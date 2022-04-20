import { HTTPVersion } from "find-my-way";
import { IRoute } from ".";
import { getRecipe, listRecipes, createRecipe, updateRecipe, deleteRecipe, rateRecipe } from "../service/recipe-service";

const recipeRoutes: IRoute<HTTPVersion>[] = [
    {
        method: "GET",
        path: "/recipes",
        handler: listRecipes,
        protected: false,
    },
    {
        method: "POST",
        path: "/recipes",
        handler: createRecipe,
        protected: true,
    },
    {
        method: "GET",
        path: "/recipes/:id",
        handler: getRecipe,
        protected: false,
    },
    {
        method: "PUT",
        path: "/recipes/:id",
        handler: updateRecipe,
        protected: true,
    },
    {
        method: "PATCH",
        path: "/recipes/:id",
        handler: updateRecipe,
        protected: true,
    },
    {
        method: "DELETE",
        path: "/recipes/:id",
        handler: deleteRecipe,
        protected: true,
    },
    {
        method: "POST",
        path: "/recipes/:id/rating",
        handler: rateRecipe,
        protected: false,
    },
];

export default recipeRoutes;