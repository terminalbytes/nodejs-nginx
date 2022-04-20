import { Table, Column, Model, HasMany, PrimaryKey, Max, AutoIncrement } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";
import { RecipeRating } from "./RecipeRating";

@Table({
    tableName: "recipes",
    timestamps: true,
})
export class Recipe extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    name: string; // Name of the recipe

    @Column
    time: string; // Preparation time

    @Column(DataType.ARRAY(DataType.TEXT))
    ingredients: string[];

    @Column(DataType.ARRAY(DataType.TEXT))
    steps: string[]; // Steps seem pretty important to have in a recipe.

    @Column
    deleted: boolean; // Always soft delete (data is valuable)

    @Max(3)
    @Column
    difficulty: string; // Easy (1), Medium (2), Hard (3)

    @Column
    vegetarian: boolean; // Is this a vegetarian recipe?

    @HasMany(() => RecipeRating)
    ratings: RecipeRating[];
}