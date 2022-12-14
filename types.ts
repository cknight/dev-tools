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

