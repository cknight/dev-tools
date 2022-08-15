import { assert, assertEquals } from "https://deno.land/std@0.132.0/testing/asserts.ts";
import { test } from "../test_deps.ts";
import { EncodeDecodeError } from "../types.ts";
import { decodeUriInput, encodeUriInput } from "./uriEncoding.ts";


test({
  name: "uri encoding works",
  fn() {
    assertEquals("hello", encodeUriInput("hello"));
    assertEquals("hello%20world", encodeUriInput("hello world"));
    assertEquals("%3B%2C%2F%3F%3A%40%26%3D%2B%24", encodeUriInput(";,/?:@&=+$"));
    assertEquals("-_.!~*'()", encodeUriInput("-_.!~*'()"));
    assertEquals("%D1%88%D0%B5%D0%BB%D0%BB%D1%8B", encodeUriInput("шеллы"));
    assertEquals("Failed to encode input", (encodeUriInput("\uD800") as EncodeDecodeError).msg);
  }
});

test({
  name: "uri decoding works",
  fn() {
    assertEquals("hello", decodeUriInput("hello"));
    assertEquals("hello world", decodeUriInput("hello%20world"));
    assertEquals(";,/?:@&=+$", decodeUriInput("%3B%2C%2F%3F%3A%40%26%3D%2B%24"));
    assertEquals("-_.!~*'()", decodeUriInput("-_.!~*'()"));
    assertEquals("шеллы", decodeUriInput("%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"));
    assertEquals("Failed to decode input", (decodeUriInput("%E0%A4%A") as EncodeDecodeError).msg);
  }
});