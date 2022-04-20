# Recipe API 🧑‍💻

> Version 1.0.0

## Path Table

| Method | Public | Path | Description |
| --- | --- | --- | --- |
| POST |✅| [/api/signup](#postapisignup) | Add a new user to the database |
| POST |✅| [/api/login](#postapilogin) | Login and get bearer token to use in the APIs that require authentication. |
| GET |✅| [/api/recipes](#getapirecipes) | Get all recipes |
| POST |❌| [/api/recipes](#postapirecipes) | Add a new recipes to the database |
| GET |✅| [/api/recipes/{recipeId}](#getapirecipesrecipeid) | Get recipe by id |
| PUT/PATCH |❌| [/api/recipes/{recipeId}](#patchapirecipesrecipeid) | Update a specific recipe |
| DELETE |❌| [/api/recipes/{recipeId}](#deleteapirecipesrecipeid) | Delete a specific recipe |
| POST |✅| [/api/recipes/{recipeId}/rating](#postapirecipesrecipeidrating) | Add a new rating for a recipe |

## Path Details

***

### [POST]/api/signup

- Summary  
Add a new user to the database

#### RequestBody

- application/json

```ts
{
  // Email of the user
  email?: string
  // Password of the user
  password?: string
}
```

#### Responses

- 200 User created

- 409 User already exists

- 422 Validation error / unprocessable entity

***

### [POST]/api/login

- Summary  
Login and get bearer token to use in the APIs that require authentication.

#### RequestBody

- application/json

```ts
{
  // Email of the user
  email?: string
  // Password of the user
  password?: string
}
```

#### Responses

- 200 User created

- 401 Authentication failed

- 422 Validation error / unprocessable entity

***

### [GET]/api/recipes

- Summary  
Get all recipes

#### Parameters(Query)

```ts
limit?: integer
```

```ts
offset?: integer
```

#### Responses

- 200 Success

***

### [POST]/api/recipes

- Summary  
Add a new recipes to the database

- Security  
BearerAuth  

#### RequestBody

- application/json

```ts
{
  // Name of the recipe
  name?: string
  // Preparation Time
  time?: string
  // Difficulty rating (1 to 3, 1 being the easiest)
  difficulty?: integer
  // Is the recipe vegetarian?
  vegetarian?: boolean
  ingredients?: string[]
  steps?: string[]
  // Is the recipe deleted?
  deleted?: boolean
  // When the recipe was created
  createdAt?: string
  // When the recipe was last updated
  updatedAt?: string
}
```

#### Responses

- 201 Resource created

- 401 Unauthorized

- 422 Validation error / unprocessable entity

***

### [GET]/api/recipes/{recipeId}

- Summary  
Get recipe by id

#### Responses

- 200 Success, yay!

***

### [PATCH]/api/recipes/{recipeId}

- Summary  
Update a specific recipe

- Security  
BearerAuth  

#### RequestBody

- application/json

```ts
{
  // Name of the recipe
  name?: string
  // Preparation Time
  time?: string
  // Difficulty rating (1 to 3, 1 being the easiest)
  difficulty?: integer
  // Is the recipe vegetarian?
  vegetarian?: boolean
  ingredients?: string[]
  steps?: string[]
  // Is the recipe deleted?
  deleted?: boolean
  // When the recipe was created
  createdAt?: string
  // When the recipe was last updated
  updatedAt?: string
}
```

#### Responses

- 200 Recipe updated

- 401 Unauthorized

- 422 You screwed up, lol

***

### [DELETE]/api/recipes/{recipeId}

- Summary  
Delete a specific recipe

- Security  
BearerAuth  

#### Responses

- 200 Recipe deleted

- 401 Unauthorized

***

### [POST]/api/recipes/{recipeId}/rating

- Summary  
Add a new rating for a recipe

#### RequestBody

- application/json

```ts
{
  // Rating for this recipe
  rating?: integer
}
```

#### Responses

- 200 Rating submitted

- 404 Recipe not found

## Schemas

### recipe

```ts
{
  // Name of the recipe
  name?: string
  // Preparation Time
  time?: string
  // Difficulty rating (1 to 3, 1 being the easiest)
  difficulty?: integer
  // Is the recipe vegetarian?
  vegetarian?: boolean
  ingredients?: string[]
  steps?: string[]
  // Is the recipe deleted?
  deleted?: boolean
  // When the recipe was created
  createdAt?: string
  // When the recipe was last updated
  updatedAt?: string
}
```

### user

```ts
{
  // Email of the user
  email?: string
  // Password of the user
  password?: string
}
```

### rating

```ts
{
  // Rating for this recipe
  rating: integer
}
```
