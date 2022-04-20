export const LISTEN_INET = "0.0.0.0";
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 9883;
export const APP_PRIVATE_KEY = process.env.APP_PRIVATE_KEY!;

export enum SupportedContentTypes {
    ApplicationJson = "application/json",
    ApplicationXml = "application/xml",
    PlainText = "text/plain",
}

export enum HTTPStatus {
    Ok = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    UnprocessableEntity = 422,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    InternalServerError = 500,
}

export enum STRING {
    Empty = "",
    NewLine = "\n",
    Space = "  ",
    Colon = ": ",
}

export enum RequestHeaders {
    ContentType = "content-type",
    Accept = "accept",
    Authorization = "authorization",
    ApiKey = "x-api-key",
}

export enum ErrorMessages {
    InternalServerError = "Sorry, something went wrong",
    Unauthorized = "Unauthorized",
    UserNotFound = "User not found",
    EmailAndPasswordRequired = "Email and password are required",
    UserExists = "User already exists",
    RecipeRequired = "Recipe is required",
    RecipeIdRequired = "Recipe and Recipe Id is required",
}

export enum ResponseMessages {
    Success = "Success",
    Failed = "Failed",
    BadRequest = "Bad Request",
    Ok = "OK",
}