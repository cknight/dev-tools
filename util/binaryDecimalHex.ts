import { EncodeDecodeError } from "../types.ts";

/**
 * @param input - positive integer values only (negatives and fractions not yet supported)
 * @returns true if binary
 */
export function isBinary(input:string): boolean {
  const binaryRegEx = /^[01]+$/;
  return binaryRegEx.test(input.trim());
}

/**
 * @param input - positive integer values only (negatives and fractions not yet supported)
 * @returns true if hex
 */
export function isHex(input:string): boolean {
  const hexRegEx = /^[0-9a-fA-F]+$/;
  return hexRegEx.test(input.trim());
}

/**
 * @param input - positive integers only (negatives and fractions not yet supported)
 * @returns true if decimal
 */
export function isDecimal(input:string): boolean {
  const decimalRegEx = /^[0-9]+$/;
  return decimalRegEx.test(input.trim());
}

export function binaryToDecimal(input:string): string | EncodeDecodeError {
  try {
    return BigInt('0b' + input).toString(10);
  } catch (err) {
    return {msg: "Failed to convert binary to decimal", err: err};
  }
}

export function binaryToHex(input:string): string | EncodeDecodeError {
  try {
    return BigInt('0b' + input).toString(16);
  } catch (err) {
    return {msg: "Failed to convert binary to hex", err: err};
  }
}

export function hexToDecimal(input:string): string | EncodeDecodeError {
  try {
    return BigInt('0x' + input).toString(10);
  } catch (err) {
    return {msg: "Failed to convert hex to decimal", err: err};
  }
}

export function hexToBinary(input:string): string | EncodeDecodeError {
  try {
    return BigInt('0x' + input).toString(2);
  } catch (err) {
    return {msg: "Failed to convert hex to binary", err: err};
  }
}
export function decimalToHex(input:string): string | EncodeDecodeError {
  try {
    return BigInt(input).toString(16);
  } catch (err) {
    return {msg: "Failed to convert decimal to hex", err: err};
  }
}
export function decimalToBinary(input:string): string | EncodeDecodeError {
  try {
    return BigInt(input).toString(2);
  } catch (err) {
    return {msg: "Failed to convert decimal to binary", err: err};
  }
}