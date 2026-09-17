import { describe, expect, it } from "vitest";
import { subjectSchema } from "./schema";

describe("subjectSchema", () => {
  it("accepts a complete subject", () => {
    const result = subjectSchema.safeParse({
      name: "Mathematics",
      code: "MATH101",
      description: "Introduction to mathematics",
      department: "Science",
    });

    expect(result.success).toBe(true);
  });

  it("rejects subject fields that are too short", () => {
    const result = subjectSchema.safeParse({
      name: "Ma",
      code: "MATH",
      description: "Math",
      department: "S",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.path[0])).toEqual([
        "name",
        "code",
        "description",
        "department",
      ]);
    }
  });
});