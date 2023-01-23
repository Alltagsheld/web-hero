import prettier from "https://unpkg.com/prettier@2.8.1/esm/standalone.mjs";
import parserBabel from "https://unpkg.com/prettier@2.8.1/esm/parser-babel.mjs";
import parserGraphql from "https://unpkg.com/prettier@2.8.1/esm/parser-graphql.mjs";
import parserHtml from "https://unpkg.com/prettier@2.8.1/esm/parser-html.mjs";

export function format(value, fileName) {
    const fileType = fileName.substr(fileName.lastIndexOf("."));
    switch (fileType) {
        case ".tsx": {
            return formatTsx(value);
        }
        case ".html": {
            return formatHTML(value);
        }
        case ".json": {
            return formatJson(value);
        }
        default: return value;
    }
}

export function formatTsx(value){
return prettier.format(value, {
    parser: "babel-ts",
    plugins: [parserBabel, parserHtml],
    })
}

export function formatTest(value) {
return prettier.format(value, {
    parser: "babel",
    plugins: [parserBabel, parserGraphql],
    })
}

export function formatHTML(value) {
    return prettier.format(value, {
        parser: "html",
        plugins: [parserBabel, parserHtml],
    })
}

export function formatJson(value) {
return prettier.format(value, {
    parser: "json",
    plugins: [parserBabel, parserHtml],
    })
}