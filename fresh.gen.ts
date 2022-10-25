// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[tool].tsx";
import * as $1 from "./routes/index.tsx";
import * as $$0 from "./islands/EncoderDecoder.tsx";
import * as $$1 from "./islands/FormatValidate.tsx";
import * as $$2 from "./islands/FormatValidate2.tsx";
import * as $$3 from "./islands/Menu.tsx";
import * as $$4 from "./islands/PasswordGenerator.tsx";
import * as $$5 from "./islands/Selector.tsx";
import * as $$6 from "./islands/TextDiff.tsx";

const manifest = {
  routes: {
    "./routes/[tool].tsx": $0,
    "./routes/index.tsx": $1,
  },
  islands: {
    "./islands/EncoderDecoder.tsx": $$0,
    "./islands/FormatValidate.tsx": $$1,
    "./islands/FormatValidate2.tsx": $$2,
    "./islands/Menu.tsx": $$3,
    "./islands/PasswordGenerator.tsx": $$4,
    "./islands/Selector.tsx": $$5,
    "./islands/TextDiff.tsx": $$6,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
