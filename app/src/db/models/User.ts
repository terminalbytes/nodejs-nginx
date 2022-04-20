import { Table, Column, Model, PrimaryKey, IsEmail } from "sequelize-typescript";

@Table({
    tableName: "users",
    timestamps: true,
})
export class User extends Model {
    @PrimaryKey
    @IsEmail
    @Column
    email: string; // Email is the primary key, so it's unique.

    @Column
    passwordHash: string; // Password is hashed with a salt so it's not stored in plain text, format: `passwordHash.salt`
}