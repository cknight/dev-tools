import { EncodeDecodeError } from "../types.ts";

export function encodeHtmlEntities(input:string): string | EncodeDecodeError {
  try {
    const textArea = document.createElement('textArea');
    textArea.innerHTML = input;
    return (textArea as HTMLTextAreaElement).innerHTML;
  } catch (err) {
    return {msg: "Failed to encode HTML", err: err}
  }
}

export function decodeHtmlEntities(input: string): string | EncodeDecodeError {
  try {
    const textArea = document.createElement('textArea');
    textArea.innerHTML = input;
    return (textArea as HTMLTextAreaElement).value;
  } catch (err) {
    return {msg: "Failed to decode HTML", err: err};
  }
}