import { EncodeDecodeError } from "../types.ts";

export function isBase64(input:string): boolean {
  const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  return base64regex.test(input.trim());
}

export function stringToBase64(input:string): string | EncodeDecodeError {
 try {
  return btoa(encodeURIComponent(input.trim()).replace(/%([0-9A-F]{2})/g, function(match, p1) {
    return String.fromCharCode(parseInt(p1, 16))
})) 
 } catch (err) {
  return { msg: "Unable to encode to Base64", err: err};
 }
}

export function base64ToString(input:string): string | EncodeDecodeError {
  try {
    return decodeURIComponent(Array.prototype.map.call(atob(input.trim()), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''));
  } catch (err) {
    return {msg: "Unable to decode from Base64", err:err};
  }
}