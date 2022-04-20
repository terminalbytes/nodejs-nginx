import { Table, Column, Model, Max, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Recipe } from "./Recipe";


@Table({
    tableName: "recipe_ratings",
    timestamps: true,
})
export class RecipeRating extends Model {
    @ForeignKey(() => Recipe)
    @Column
    recipeId: number; // Foreign key to the recipe

    @Max(5)
    @Column
    rating: number; // Rating from 1 to 5

    @BelongsTo(() => Recipe)
    recipe: Recipe; // Recipe this rating belongs to
}