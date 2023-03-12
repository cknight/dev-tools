import TextDiff from "../islands/TextDiff.tsx";
import { Tool } from "../types.ts";
import PasswordGenerator from "../islands/PasswordGenerator.tsx";
import FormatValidate_Less from "../islands/FormatValidate_Less.tsx";
import Base64Decode from "../islands/Decode_Base64.tsx";
import HtmlEntityDecode from "../islands/Decode_HtmlEntity.tsx";
import JwtDecode from "../islands/Decode_Jwt.tsx";
import UrlDecode from "../islands/Decode_Url.tsx";
import Base64Encode from "../islands/Encode_Base64.tsx";
import HtmlEntityEncode from "../islands/Encode_HtmlEntity.tsx";
import UrlEncode from "../islands/Encode_Url.tsx";
import CssFormatValidate from "../islands/FormatValidate_Css.tsx";
import GraphQLFormatValidate from "../islands/FormatValidate_GraphQL.tsx";
import HtmlFormatValidate from "../islands/FormatValidate_Html.tsx";
import JsonFormatValidate from "../islands/FormatValidate_Json.tsx";
import Json5FormatValidate from "../islands/FormatValidate_Json5.tsx";
import TypescriptFormatValidate from "../islands/FormatValidate_Typescript.tsx";
import YamlFormatValidate from "../islands/FormatValidate_Yaml.tsx";
import FormatValidate_Scss from "../islands/FormatValidate_Scss.tsx";
import MarkdownFormatValidate from "../islands/FormatValidate_Markdown.tsx";
import JavascriptFormatValidate from "../islands/FormatValidate_Javascript.tsx";
import XmlFormatValidate from "../islands/FormatValidate_Xml.tsx";
import UrlParser from "../islands/UrlParser.tsx";
import TimestampConverter from "../islands/Converter_UnixTimestamp.tsx";

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
  ["base64-encode", {
    displayName: "Base64 Encode",
    metaDescription: "Encode a string to Base64.",
    island: Base64Encode,
    pageTitle: "Base64 Encode - Dev Tools",
  }],
  ["html-entity-encode", {
    displayName: "HTML Entity Encode",
    metaDescription: "Convert text within a string to entities for safe use within HTML or XML by encoding special characters",
    island: HtmlEntityEncode,
    pageTitle: "HTML Entity Encode - Dev Tools",
  }],
  ["url-encode", {
    displayName: "URL Encode",
    metaDescription: "Encode a string for safe use in a URL using URL encoding (also known as percent-encoding).",
    island: UrlEncode,
    pageTitle: "URL Encode - Dev Tools",
  }],
  ["base64-decode", {
    displayName: "Base64 Decode",
    metaDescription: "Decode a string from Base64.",
    island: Base64Decode,
    pageTitle: "Base64 Decode - Dev Tools",
  }],
  ["html-entity-decode", {
    displayName: "HTML Entity Decode",
    metaDescription: "Decode a string from HTML entities.",
    island: HtmlEntityDecode,
    pageTitle: "HTML Entity Decode - Dev Tools",
  }],
  ["jwt-decode", {
    displayName: "JWT Decode",
    metaDescription: "Decode a JWT token to see the header, payload and signature parts.",
    island: JwtDecode,
    pageTitle: "JWT Decode - Dev Tools",
  }],
  ["url-decode", {
    displayName: "URL Decode",
    metaDescription: "Decode an encoded URL (also known as percent encoded string) to a string.",
    island: UrlDecode,
    pageTitle: "URL Decode - Dev Tools",
  }],
  ["css-format-validate", {
    displayName: "CSS Format/Validate",
    metaDescription: "Format and validate CSS",
    island: CssFormatValidate,
    pageTitle: "CSS Format/Validate - Dev Tools",
  }],
  ["graphql-format-validate", {
    displayName: "GraphQL Format/Validate",
    metaDescription: "Format and validate GraphQL",
    island: GraphQLFormatValidate,
    pageTitle: "GraphQL Format/Validate - Dev Tools",
  }],
  ["html-format-validate", {
    displayName: "HTML Format/Validate",
    metaDescription: "Format and validate HTML",
    island: HtmlFormatValidate,
    pageTitle: "HTML Format/Validate - Dev Tools",
  }],
  ["javascript-format-validate", {
    displayName: "Javascript/JSX Format/Validate",
    metaDescription: "Format and validate Javascript and JSX",
    island: JavascriptFormatValidate,
    pageTitle: "Javascript/JSX Format/Validate - Dev Tools",
  }],
  ["json-format-validate", {
    displayName: "JSON Format/Validate",
    metaDescription: "Format and validate JSON",
    island: JsonFormatValidate,
    pageTitle: "JSON Format/Validate - Dev Tools",
  }],
  ["json5-format-validate", {
    displayName: "JSON5 Format/Validate",
    metaDescription: "Format and validate JSON5",
    island: Json5FormatValidate,
    pageTitle: "JSON5 Format/Validate - Dev Tools",
  }],
  ["less-format-validate", {
    displayName: "Less Format/Validate",
    metaDescription: "Format and validate Less css",
    island: FormatValidate_Less,
    pageTitle: "Less Format/Validate - Dev Tools",
  }],
  ["markdown-format-validate", {
    displayName: "Markdown Format/Validate",
    metaDescription: "Format and validate Markdown",
    island: MarkdownFormatValidate,
    pageTitle: "Markdown Format/Validate - Dev Tools",
  }],
  ["scss-format-validate", {
    displayName: "SCSS Format/Validate",
    metaDescription: "Format and validate SCSS",
    island: FormatValidate_Scss,
    pageTitle: "SCSS Format/Validate - Dev Tools",
  }],
  ["typescript-format-validate", {
    displayName: "Typescript/TSX Format/Validate",
    metaDescription: "Format and validate Typescript and TSX",
    island: TypescriptFormatValidate,
    pageTitle: "Typescript/TSX Format/Validate - Dev Tools",
  }],
  ["xml-format-validate", {
    displayName: "XML Format/Validate",
    metaDescription: "Format and validate XML",
    island: XmlFormatValidate,
    pageTitle: "XML Format/Validate - Dev Tools",
  }],
  ["yaml-format-validate", {
    displayName: "YAML Format/Validate",
    metaDescription: "Format and validate YAML",
    island: YamlFormatValidate,
    pageTitle: "YAML Format/Validate - Dev Tools",
  }],
  ["url-parser", {
    displayName: "URL Parser",
    metaDescription: "Parse a URL into its component parts",
    island: UrlParser,
    pageTitle: "URL Parser - Dev Tools",
  }],
  ["timestamp-converter", {
    displayName: "Timestamp Converter",
    metaDescription: "Convert a Unix timestamp to a human readable date and time, or vice versa.",
    island: TimestampConverter,
    pageTitle: "Timestamp Converter - Dev Tools",
  }],
]);