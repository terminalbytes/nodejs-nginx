import { expect } from "chai";
import { describe, it } from "mocha";
import { toPlainText } from "../../../../../src/utils/content-converters/text-converter";

describe("Text conversion", () => {
    it("should convert simple object to text", () => {
        const text = toPlainText({
            content: "test content",
        });
        expect(text).to.be.a("string");
        expect(text).to.equal("content: test content\n");
    });

    it("should convert complex object to text", () => {
        const text = toPlainText({
            content: "test content",
            nested: {
                contentNested: "nested content",
                doubleNested: {
                    contentDoubleNested: "double nested content",
                },
            },
        });
        expect(text).to.be.a("string");
        expect(text).to.include("content: test content");
        expect(text).to.include("contentNested: nested content");
        expect(text).to.include("contentDoubleNested: double nested content");
    });

    it("should convert numbers to text", () => {
        const text = toPlainText({
            answerToLife: 42,
        });
        expect(text).to.be.a("string");
        expect(text).to.include("answerToLife: 42");
    });

    it("should convert array to text", () => {
        const text = toPlainText({
            answerToLife: [
                42,
                21,
            ],
        });
        expect(text).to.be.a("string");
        expect(text).to.include("0: 42");
        expect(text).to.include("1: 21");
    });
});