import { createUserSchema } from "../src/DTO/createUser.dto.js";
import { loginUserSchema } from "../src/DTO/loginUser.dto.js";

it("should validate CreationDTO correctly", () => {
  expect(() => createUserSchema.parse({ name: "A", email: "invalid", password: "123" })).toThrow();
});

it("should validate LoginDTO correctly", () => {
  expect(() => loginUserSchema.parse({ email: "invalid", password: "123" })).toThrow();
});

