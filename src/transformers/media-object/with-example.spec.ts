import type { MediaTypeObject, SchemaObject } from "@moontai0724/openapi-types";
import { Type } from "@sinclair/typebox";
import { expect, it } from "vitest";

import { transformMediaObject } from ".";

const schema: SchemaObject = Type.Object(
  {
    name: Type.String(),
    age: Type.Optional(Type.Integer({ format: "int32" })),
  },
  {
    example: {
      name: "sample1",
      age: 10,
    },
  },
);

const expected: MediaTypeObject = {
  schema: {
    type: "object",
    required: ["name"],
    properties: {
      name: {
        type: "string",
      },
      age: {
        type: "integer",
        format: "int32",
      },
    },
  },
  example: {
    name: "sample1",
    age: 10,
  },
};

it("should be able to omit example from schema", () => {
  expect(transformMediaObject(schema)).toEqual(expected);
});
