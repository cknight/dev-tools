import { EncoderRegistryEntry } from "../types.ts";
import { base64ToString, isBase64, stringToBase64 } from "./base64.ts";
import { binaryToDecimal, binaryToHex, decimalToBinary, decimalToHex, hexToBinary, hexToDecimal, isBinary, isDecimal, isHex } from "./binaryDecimalHex.ts";

function stringValidator(i: string): boolean {
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
      selectValue: "base64-to-string",
      displayName: "Base64 to String",
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
    selectValue: "string-to-base64",
    displayName: "String to Base64",
    encoder: stringToBase64,
    isValidInput: stringValidator,
    inputLabel: "string",
    outputLabel: "Base64",
  },
        /*
        <option value="binary-to-hex">Binary to Hex</option>
        <option value="binary-to-decimal">Binary - Decimal</option>
        <option value="decimal-to-hex">Decimal to Hex</option>
        <option value="decimal-to-binary">Decimal to Binary</option>
        <option value="hex-to-binary">Hex to Binary</option>
        <option value="hex-to-decimal">Hex to Decimal</option>
        <option value="html-entities-to-string">HTML Entities to String</option>
        <option value="string-to-html-entities">String to HTML Entities</option>
        <option value="string-to-url">String to URL</option>
        <option value="url-to-string">URL to String</option> */

];