import TextDiff from "../islands/TextDiff.tsx";
import { Tool } from "../types.ts";
import PasswordGenerator from "../islands/PasswordGenerator.tsx";
import FormatValidate from "../islands/FormatValidate.tsx";
import EncoderDecoder from "../islands/EncoderDecoder.tsx";

export const toolRegistry:Map<string, Tool> = new Map([
  ["text-diff", {
    displayName: "Text Diff",
    metaDescription: "Compare two blocks of text and find the differences, also known as a diff.",
    island: TextDiff,
    pageTitle: "Text Diff - Dev Tools",
  }],
  ["password-generator", {
    displayName: "Password Generator",
    metaDescription: "Auto-generate a secure, strong, customisable and easy to use random password.",
    island: PasswordGenerator,
    pageTitle: "Password Generator - Dev Tools",
  }],
  ["base64-encode-decdode", {
    displayName: "Base64 Encode/Decode",
    metaDescription: "Encode or decode a string to or from Base64.",
    island: EncoderDecoder,
    pageTitle: "Base64 Encode/Decode - Dev Tools",
  }],
  ["html-entity-encode-decdode", {
    displayName: "HTML Entity Encode/Decode",
    metaDescription: "Encode or decode a string to or from HTML entities.",
    island: EncoderDecoder,
    pageTitle: "HTML Entity Encode/Decode - Dev Tools",
  }],
  ["jwt-decdode", {
    displayName: "JWT Decode",
    metaDescription: "Decode a JWT token to see the contents.",
    island: EncoderDecoder,
    pageTitle: "JWT Decode - Dev Tools",
  }],
  ["uri-encode-decdode", {
    displayName: "URI Encode/Decode",
    metaDescription: "Encode a string for use in a URI or decode a URI to a string.",
    island: EncoderDecoder,
    pageTitle: "URI Encode/Decode - Dev Tools",
  }],
  ["css-format-validate", {
    displayName: "CSS Format/Validate",
    metaDescription: "Format and validate CSS",
    island: FormatValidate,
    pageTitle: "CSS Format/Validate - Dev Tools",
  }],
  ["graphql-format-validate", {
    displayName: "GraphQL Format/Validate",
    metaDescription: "Format and validate GraphQL",
    island: FormatValidate,
    pageTitle: "GraphQL Format/Validate - Dev Tools",
  }],
  ["html-format-validate", {
    displayName: "HTML Format/Validate",
    metaDescription: "Format and validate HTML",
    island: FormatValidate,
    pageTitle: "HTML Format/Validate - Dev Tools",
  }],
  ["javascript-format-validate", {
    displayName: "Javascript/JSX Format/Validate",
    metaDescription: "Format and validate Javascript and JSX",
    island: FormatValidate,
    pageTitle: "Javascript/JSX Format/Validate - Dev Tools",
  }],
  ["json-format-validate", {
    displayName: "JSON Format/Validate",
    metaDescription: "Format and validate JSON, JSONC and JSON5",
    island: FormatValidate,
    pageTitle: "JSON Format/Validate - Dev Tools",
  }],
  ["less-format-validate", {
    displayName: "Less Format/Validate",
    metaDescription: "Format and validate Less",
    island: FormatValidate,
    pageTitle: "Less Format/Validate - Dev Tools",
  }],
  ["markdown-format-validate", {
    displayName: "Markdown Format/Validate",
    metaDescription: "Format and validate Markdown",
    island: FormatValidate,
    pageTitle: "Markdown Format/Validate - Dev Tools",
  }],
  ["scss-format-validate", {
    displayName: "SCSS Format/Validate",
    metaDescription: "Format and validate SCSS",
    island: FormatValidate,
    pageTitle: "SCSS Format/Validate - Dev Tools",
  }],
  ["typescript-format-validate", {
    displayName: "Typescript/TSX Format/Validate",
    metaDescription: "Format and validate Typescript and TSX",
    island: FormatValidate,
    pageTitle: "Typescript/TSX Format/Validate - Dev Tools",
  }],
  ["xml-format-validate", {
    displayName: "XML Format/Validate",
    metaDescription: "Format and validate XML",
    island: FormatValidate,
    pageTitle: "XML Format/Validate - Dev Tools",
  }],
  ["yaml-format-validate", {
    displayName: "YAML Format/Validate",
    metaDescription: "Format and validate YAML",
    island: FormatValidate,
    pageTitle: "YAML Format/Validate - Dev Tools",
  }],
]);