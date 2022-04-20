import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { APP_PRIVATE_KEY } from "./constants";
import { logger } from "@utils/logger";

export const hashPassword = (password: string): string => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return `${hash}.${salt}`;
};

export const verifyPassword = (password: string, passwordHash: string): boolean => {
    const [hash, salt] = passwordHash.split(".");
    const hashVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
    return hash === hashVerify;
};

export const generateToken = (email: string, privateKey?: string): string => {
    const key = APP_PRIVATE_KEY || privateKey;
    return jwt.sign({
        data: {
            email,
        },
    }, key!, { expiresIn: "24h" });
};

export const verifyToken = (token: string, privateKey?: string): boolean => {
    try {
        const key = APP_PRIVATE_KEY || privateKey;
        const claims = jwt.verify(token, key!);
        return true;
    } catch (error) {
        return false;
    }
};