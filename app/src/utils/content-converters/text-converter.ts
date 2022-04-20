import { STRING } from "../constants";

export const toPlainText = (object: Record<string, any>, level = 0) => {
    let result: string = STRING.Empty;
    level = level || 0;

    Object.keys(object).forEach(function (key) {
        let i = level;
        while (i--) {
            result += STRING.Space;
        }
        if (typeof object[key] === "object" && object[key] !== null) {
            result += key + STRING.NewLine;
            result += toPlainText(object[key], level + 1);
            return;
        }
        result += key + STRING.Colon + object[key] + STRING.NewLine;

    });

    return result;
};