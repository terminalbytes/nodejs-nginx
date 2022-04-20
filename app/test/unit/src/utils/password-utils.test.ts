require("dotenv").config("../../../../../.env.test");

import { expect } from "chai";
import { describe, it, before } from "mocha";
import { APP_PRIVATE_KEY } from "../../../../src/utils/constants";
import * as passwordUtils from "../../../../src/utils/password-utils";


/**
 * Test the functionality for password hashing
 */
describe("Password utils sanity check", () => {
    const testPassword = "testPassword";
    const longPassword = "anotherReallyLongPasswordWhichMightAsWellBeAParagraph.I'mStillWritingAndThisIsTheEndOfTheParagraph";
    const specialCharPassword = "!@#$%^&*()_+{}[]|\\:;'<>?,./";

    let hash: string;
    before(() => {
        process.env.APP_PRIVATE_KEY = "test";
    });

    it("should hash the password with salt", () => {
        hash = passwordUtils.hashPassword(testPassword);

        expect(hash).to.be.a("string");
        expect(hash).to.include(".");
    });

    it("should successfully verify correct password", () => {
        const success = passwordUtils.verifyPassword(testPassword, hash);

        expect(success).to.be.a("boolean");
        expect(success).to.be.true;
    });

    it("should not verify password with incorrect hash", () => {
        const success = passwordUtils.verifyPassword(testPassword, hash + "1");

        expect(success).to.be.a("boolean");
        expect(success).to.be.false;
    });

    it("should not verify incorrect password", () => {
        const success = passwordUtils.verifyPassword(testPassword + "1", hash);

        expect(success).to.be.a("boolean");
        expect(success).to.be.false;
    });

    it("should correctly hash and verify a long password", () => {
        const passwordHash = passwordUtils.hashPassword(longPassword);
        const success = passwordUtils.verifyPassword(longPassword, passwordHash);

        expect(passwordHash).to.be.a("string");
        expect(passwordHash).to.include(".");
        expect(success).to.be.a("boolean");
        expect(success).to.be.true;
    });

    it("should correctly hash and verify a special char only password", () => {
        const passwordHash = passwordUtils.hashPassword(specialCharPassword);
        const success = passwordUtils.verifyPassword(specialCharPassword, passwordHash);

        expect(passwordHash).to.be.a("string");
        expect(passwordHash).to.include(".");
        expect(success).to.be.a("boolean");
        expect(success).to.be.true;
    });

});

/**
 * Test the functionality for jwt signing
 */
describe("JWT signing sanity check", () => {

    const email = "test@test.com";
    const privateKey = "test";

    it("should generate a signed jwt", () => {
        const jwt = passwordUtils.generateToken(email, privateKey);
        expect(jwt).to.be.a("string");
        expect(jwt.length).to.be.greaterThan(10);
    });

    it("should generate and verify a signed jwt", () => {
        const jwt = passwordUtils.generateToken(email, privateKey);
        const verified = passwordUtils.verifyToken(jwt, privateKey);

        expect(jwt).to.be.a("string");
        expect(jwt.length).to.be.greaterThan(10);
        expect(verified).to.be.a("boolean");
        expect(verified).to.be.true;
    });

    it("should fail to verify a bad jwt", () => {
        const verified = passwordUtils.verifyToken("randomStuff", privateKey);

        expect(verified).to.be.a("boolean");
        expect(verified).to.be.false;
    });
});