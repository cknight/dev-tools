import { EncoderRegistryEntry } from "../types.ts";
import { base64ToString, isBase64, stringToBase64 } from "./base64.ts";
import { binaryToDecimal, binaryToHex, decimalToBinary, decimalToHex, hexToBinary, hexToDecimal, isBinary, isDecimal, isHex } from "./binaryDecimalHex.ts";
import { decodeHtmlEntities, encodeHtmlEntities } from "./htmlEntities.ts";
import { decodeUriInput, encodeUriInput } from "./uriEncoding.ts";

function stringValidator(): boolean {
  return true;
}

export const registry:EncoderRegistryEntry[] = [
  {
    selectValue: "default",
    displayName: "Please select",
    encoder: () => "",
    isValidInput: stringValidator,
    inputLabel: "-",
    outputLabel: "-"
  },
  {
    selectValue: "base64-encode",
    displayName: "Base64 - encode",
    encoder: stringToBase64,
    isValidInput: stringValidator,
    inputLabel: "string",
    outputLabel: "Base64",
  },
  {
      selectValue: "base64-decode",
      displayName: "Base64 - decode",
      encoder: base64ToString,
      isValidInput: isBase64,
      inputLabel: "Base64",
      outputLabel: "string",
  },
  {
    selectValue: "binary-to-decimal",
    displayName: "Binary to Decimal",
    encoder: binaryToDecimal,
    isValidInput: isBinary,
    inputLabel: "Binary integer",
    outputLabel: "Decimal integer",
  },
  {
      selectValue: "binary-to-hex",
      displayName: "Binary to Hex",
      encoder: binaryToHex,
      isValidInput: isBinary,
      inputLabel: "Binary integer",
      outputLabel: "Hex integer",
  },
  {
    selectValue: "decimal-to-binary",
    displayName: "Decimal to Binary",
    encoder: decimalToBinary,
    isValidInput: isDecimal,
    inputLabel: "Decimal integer",
    outputLabel: "Binary integer",
  },
  {
      selectValue: "decimal-to-hex",
      displayName: "Decimal to Hex",
      encoder: decimalToHex,
      isValidInput: isDecimal,
      inputLabel: "Decimal interger",
      outputLabel: "Hex integer",
  },
  {
      selectValue: "hex-to-binary",
      displayName: "Hex to Binary",
      encoder: hexToBinary,
      isValidInput: isHex,
      inputLabel: "Hex integer",
      outputLabel: "Binary integer",
  },
  {
      selectValue: "hex-to-decimal",
      displayName: "Hex to Decimal",
      encoder: hexToDecimal,
      isValidInput: isHex,
      inputLabel: "Hex integer",
      outputLabel: "Decimal integer",
  },
  {
      selectValue: "HTML-entity-encode",
      displayName: "HTML entity - encode",
      encoder: encodeHtmlEntities,
      isValidInput: stringValidator,
      inputLabel: "HTML - raw",
      outputLabel: "HTML - entity encoded",
  },
  {
      selectValue: "HTML-entity-decode",
      displayName: "HTML entity - decode",
      encoder: decodeHtmlEntities,
      isValidInput: stringValidator,
      inputLabel: "HTML - entity encoded",
      outputLabel: "HTML - raw",
  },
  {
    selectValue: "url-encode",
    displayName: "URL - encode",
    encoder: encodeUriInput,
    isValidInput: stringValidator,
    inputLabel: "URL component",
    outputLabel: "Encoded URL component",
  },
  {
    selectValue: "url-decode",
    displayName: "URL - decode",
    encoder: decodeUriInput,
    isValidInput: stringValidator,
    inputLabel: "Encoded URL component",
    outputLabel: "Decoded URL component",
  },
];