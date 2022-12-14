import { assert, assertEquals } from "https://deno.land/std@0.132.0/testing/asserts.ts";
import { test } from "../test_deps.ts";
import { isJWT, jwtToString } from "./jwt.ts";

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
    assertEquals(jwtToString("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"), "Header:\n{\n  \"alg\": \"HS256\",\n  \"typ\": \"JWT\"\n}\n\nPayload:\n{\n  \"sub\": \"1234567890\",\n  \"name\": \"John Doe\",\n  \"iat\": 1516239022\n}\n\nUnverified signature:\n\nSflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
  }
})