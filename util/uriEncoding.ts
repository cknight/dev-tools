import { EncodeDecodeError } from "../types.ts";

export function encodeUriInput(input: string): string | EncodeDecodeError {
  try {
    return encodeURIComponent(input);
  } catch (err) {
    return {msg: "Failed to encode input", err: err};
  }
}

export function decodeUriInput(input: string): string | EncodeDecodeError {
  try {
    return decodeURIComponent(input);
  } catch (err) {
    return {msg: "Failed to decode input", err: err};
  }
}