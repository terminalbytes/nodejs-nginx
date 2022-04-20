
import xml from "xml-js";

// String Prototype, make .format() method available on all strings
declare global {
    interface String {
        format(...args: any[]): string
    }
}
if (!String.prototype.format) {
    String.prototype.format = function (...args: any[]) {
        return this.replace(/{(\d+)}/g, (match, num) => {
            return typeof args[num] !== "undefined"
                ? args[num]
                : match;

        });
    };
}

export const toXml = (object: Record<string, any>) => {
    return `<xml version="1.0" encoding="UTF-8">
    {0}
    </xml>`.format(xml.js2xml(object, { compact: true, spaces: 4, ignoreDeclaration: true }));
};