import { EncodeDecodeError } from "../types.ts";

export const HTML_ENTITIES_USE_NAMED_REFERENCES_KEY = "htmlEntitiesUseNamedReferences";
export const HTML_ENTITIES_USE_DECIMAL_ESCAPES_KEY = "htmlEntitiesUseDecimalEscapes";
export const HTML_ENTITIES_ENCODE_EVERYTHING_KEY = "htmlEntitiesEncodeEverything";
export const HTML_ENTITIES_ONLY_ENCODE_NON_ASCII_KEY = "htmlEntitiesOnlyEncodeNonAscii";
export const HTML_ENTITIES_IS_ATTRIBUTE_VALUE_KEY = "htmlEntitiesIsAttributeValue";

export function encodeHtmlEntities(input:string): string | EncodeDecodeError {
  try {
    const useNamedReferences = getLocalStorageValue(HTML_ENTITIES_USE_NAMED_REFERENCES_KEY, true);
    const useDecimalEscapes = getLocalStorageValue(HTML_ENTITIES_USE_DECIMAL_ESCAPES_KEY, false);
    const encodeEverything = getLocalStorageValue(HTML_ENTITIES_ENCODE_EVERYTHING_KEY, false);
    const onlyEncodeNonAscii = getLocalStorageValue(HTML_ENTITIES_ONLY_ENCODE_NON_ASCII_KEY, false);

    //@ts-ignore - 'he' is a global export from he.min.js
    return he.encode(input, {
      'useNamedReferences': useNamedReferences,
      'decimal': useDecimalEscapes,
      'encodeEverything': encodeEverything,
      'allowUnsafeSymbols': onlyEncodeNonAscii
    });
  } catch (err) {
    return {msg: "Failed to encode HTML", err: err}
  }
}

export function getLocalStorageValue(key: string, defaultValue: boolean): boolean {
  const value = window.localStorage.getItem(key);
  return value === null ? defaultValue : JSON.parse(value);
}

export function decodeHtmlEntities(input: string): string | EncodeDecodeError {
  try {
    const isAttributeValue = getLocalStorageValue(HTML_ENTITIES_IS_ATTRIBUTE_VALUE_KEY, false);

    //@ts-ignore - 'he' is a global export from he.min.js
    return he.decode(input, {'isAttributeValue': isAttributeValue});
  } catch (err) {
    return {msg: "Failed to decode HTML", err: err};
  }
}