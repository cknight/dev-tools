import { ComponentType, VNode } from "https://esm.sh/v95/preact@10.11.0/src/index";

export interface EncodeDecodeError {
  msg: string,
  err: Error
}

export interface Transformer {
  (input:string): string | EncodeDecodeError;
}

export interface Validator {
  (input:string): boolean
}

export interface EncoderRegistryEntry {
  selectValue: string,
  displayName: string,
  encoder: Transformer,
  isValidInput: Validator,
  inputLabel: string,
  outputLabel: string,
}

export interface Tool {
  displayName: string,
  metaDescription: string,
  pageTitle: string,
  island: ComponentType,
}