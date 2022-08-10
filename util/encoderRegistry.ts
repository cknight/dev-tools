import { EncoderRegistryEntry } from "../types.ts";
import { base64ToString, isBase64, stringToBase64 } from "./base64.ts";

function stringValidator(i: string): boolean {
  return true;
}

export const registry:Map<string, EncoderRegistryEntry> = new Map([
  ["default", {
    encoder: () => "",
    isValidInput: stringValidator,
    inputLabel: "-",
    outputLabel: "-"
  }],
  ["string-to-base64", {
      encoder: stringToBase64,
      isValidInput: stringValidator,
      inputLabel: "string",
      outputLabel: "Base64",
  }],
  ["base64-to-string", {
      encoder: base64ToString,
      isValidInput: isBase64,
      inputLabel: "Base64",
      outputLabel: "string",
  }],
]);