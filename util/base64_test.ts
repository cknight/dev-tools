import { assert, assertEquals } from "https://deno.land/std@0.132.0/testing/asserts.ts";
import { test } from "../test_deps.ts";
import { EncodeDecodeError } from "../types.ts";
import { base64ToString, isBase64, stringToBase64 } from "./base64.ts";

test({
  name: "base64 strings correctly identified",
  fn() {
    assert(isBase64(""));
    assert(!isBase64("abc"));
    assert(isBase64("U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ="));
    assert(isBase64("U29tZVN0cmluZ09idmlvdXNseU5vdEJhc2U2NEVuY29kZWQ=\n"));
    assert(isBase64("4pyT"));
  }
});

test({
  name: "string to base64",
  fn() {
    assertEquals(stringToBase64(""), "");
    assertEquals(stringToBase64("hello"), "aGVsbG8=");
    assertEquals((stringToBase64("✓") as EncodeDecodeError).msg, "Unable to encode to Base64");
    assert((stringToBase64("✓") as EncodeDecodeError).err);
  }
});

test({
  name: "base64 to string",
  fn() {
    assertEquals(base64ToString(""), "");
    assertEquals(base64ToString("aGVsbG8="), "hello");
    assertEquals((base64ToString("✓") as EncodeDecodeError).msg, "Unable to decode from Base64");
  }
})