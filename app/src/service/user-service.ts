import { getRecipeById, getRecipes } from "../repository/recipe-repository";
import { createUser, findByEmail } from "../repository/user-repository";
import { Request } from "../routes";
import { failureResponseWrapper, successResponseWrapper } from "@utils/common-utils";
import { ErrorMessages, HTTPStatus } from "@utils/constants";
import { logger } from "@utils/logger";
import { generateToken, hashPassword, verifyPassword } from "@utils/password-utils";

const login = async (req: Request, params: Record<string, unknown>) => {
    const userEmail = req?.body?.email?.toLowerCase();
    const password = req?.body?.password;
    // check if email is not empty
    if (!userEmail || !password) {
        return failureResponseWrapper({ message: ErrorMessages.EmailAndPasswordRequired, code: HTTPStatus.BadRequest });
    }

    const existing = await findByEmail(userEmail);
    if (!existing) {
        return failureResponseWrapper({ message: ErrorMessages.UserNotFound, code: HTTPStatus.Unauthorized });
    }

    if (verifyPassword(password, existing.passwordHash)) {
        return successResponseWrapper({
            user: {
                email: existing.email,
            },
            accessToken: generateToken(existing.email),
        });
    } else {
        // This is prevent user enumeration and brute force attacks
        // Don't tell the user that the password is wrong, just return a 401 with not found message.
        return failureResponseWrapper({ message: ErrorMessages.UserNotFound, code: HTTPStatus.Unauthorized });
    }
};

const signup = async (req: Request) => {
    logger.debug({ email: req.body?.email }, "Received request for signup");
    const userEmail = req?.body?.email?.toLowerCase();
    const password = req?.body?.password;

    // check if email is not empty
    if (!userEmail || !password) {
        return failureResponseWrapper({ message: ErrorMessages.EmailAndPasswordRequired, code: HTTPStatus.BadRequest });
    }

    // check if user already exists
    const existing = await findByEmail(userEmail);
    if (existing) {
        return failureResponseWrapper({ message: ErrorMessages.UserExists, code: HTTPStatus.Conflict });
    }

    // create user
    const user = await createUser({
        email: userEmail,
        passwordHash: hashPassword(req.body.password),
    });
    logger.info({ user }, "User created");
    return successResponseWrapper({
        message: "User created successfully",
        accessToken: generateToken(userEmail),
    });
};


export { login, signup };
