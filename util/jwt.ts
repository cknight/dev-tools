import { EncodeDecodeError } from "../types.ts";

export function isJWT(input:string): boolean {
  const jwtRegex = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]+)$/;
  return jwtRegex.test(input.trim());
}

export interface JWTParts {
  header: string,
  payload: string,
  signature: string
}

export function jwtToParts(input:string): JWTParts | EncodeDecodeError {
  try {
    const base64UrlHeader = input.split('.')[0];
    const base64Header = base64UrlHeader.replace(/-/g, '+').replace(/_/g, '/');
    const jsonHeader = decodeURIComponent(atob(base64Header).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const base64UrlPayload = input.split('.')[1];
    const base64Payload = base64UrlPayload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64Payload).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const jsonHeaderFormatted = JSON.stringify(JSON.parse(jsonHeader), null, 2);
    const jsonPayloadFormatted = JSON.stringify(JSON.parse(jsonPayload), null, 2);
    const unverifiedSignature = input.split('.')[2];
    return {header: jsonHeaderFormatted, payload: jsonPayloadFormatted, signature: unverifiedSignature};
   } catch (e) {
    return { msg: "Unable to decode JWT", err: e};
  }
}
