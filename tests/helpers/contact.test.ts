import { describe, it, expect } from "vitest";
import { serializeSiteraData, deserializeSiteraData } from "../../src/helpers/contact.js";

describe("contact/serialization helpers", () => {
  it("serializes and deserializes data", () => {
    const data = { id: 1, name: "Test" };
    const serialized = serializeSiteraData(data);
    expect(typeof serialized).toBe("string");
    
    const deserialized = deserializeSiteraData<{id: number, name: string}>(serialized);
    expect(deserialized.id).toBe(1);
    expect(deserialized.name).toBe("Test");
  });
});
