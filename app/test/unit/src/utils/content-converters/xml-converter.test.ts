import { expect } from "chai";
import { describe, it } from "mocha";
import { toXml } from "../../../../../src/utils/content-converters/xml-converter";

describe("XML conversion", () => {
    it("should convert simple object to xml", () => {
        const xml = toXml({
            content: "test content",
        });
        expect(xml).to.include("<content>test content</content>\n");
    });

    it("should convert complex object to xml", () => {
        const xml = toXml({
            content: "test content",
            nested: {
                contentNested: "nested content",
                doubleNested: {
                    contentDoubleNested: "double nested content",
                },
            },
        });
        expect(xml).to.be.a("string");
        expect(xml).to.include("<nested>");
        expect(xml).to.include("<contentNested>nested content</contentNested>");
        expect(xml).to.include("<doubleNested>");
        expect(xml).to.include("<contentDoubleNested>double nested content</contentDoubleNested>");
        expect(xml).to.include("</doubleNested>");
        expect(xml).to.include("</nested>");
    });

    it("should convert numbers to xml", () => {
        const xml = toXml({
            answerToLife: 42,
        });
        expect(xml).to.be.a("string");
        expect(xml).to.include("<answerToLife>42</answerToLife>");
    });

    it("should convert array to xml", () => {
        const xml = toXml({
            answerToLife: [
                42,
                21,
            ],
        });
        expect(xml).to.be.a("string");
        expect(xml).to.include("<answerToLife>42</answerToLife>");
        expect(xml).to.include("<answerToLife>21</answerToLife>");
    });
});