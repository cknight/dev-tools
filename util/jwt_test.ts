import { assert, assertEquals } from "https://deno.land/std@0.132.0/testing/asserts.ts";
import { test } from "../test_deps.ts";
import { EncodeDecodeError } from "../types.ts";
import { isJWT, JWTParts, jwtToParts } from "./jwt.ts";

test({
  name: "isJWT correctly identifies JWT",
  fn() {
    assert(isJWT("a.b.c"));
    assert(!isJWT("a.b.c.d"));
    assert(!isJWT("a.b."));
    assert(!isJWT("abc.d"));
    assert(!isJWT("abcd"));
    assert(isJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"));
  }
});

test({
  name: "JWT decodes successfully",
  fn() {
    const parts = jwtToParts("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c") as JWTParts;
    assertEquals(parts.header, "{\n  \"alg\": \"HS256\",\n  \"typ\": \"JWT\"\n}");
    assertEquals(parts.payload, "{\n  \"sub\": \"1234567890\",\n  \"name\": \"John Doe\",\n  \"iat\": 1516239022\n}");
    assertEquals(parts.signature, "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
  }
});

test({
  name: "Failed JWT decoding returns error",
  fn() {
    const parts = jwtToParts("a.b.c") as EncodeDecodeError;
    assertEquals(parts.msg, "Unable to decode JWT");
  }
});