import { EncodeDecodeError } from "../types.ts";

export function isBase64(input:string): boolean {
  const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  return base64regex.test(input.trim());
}

export function stringToBase64(input:string): string | EncodeDecodeError {
 try {
  return btoa(input.trim()); 
 } catch (err) {
  return { msg: "Unable to encode to Base64", err: err};
 }
}

export function base64ToString(input:string): string | EncodeDecodeError {
  try {
    return atob(input.trim());
  } catch (err) {
    return {msg: "Unable to decode from Base64", err:err};
  }
}