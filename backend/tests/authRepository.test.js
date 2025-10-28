const authRepo = require("../repositories/authRepository");

describe("Auth Repository", () => {
  it("should have findUserByEmail function", () => {
    expect(typeof authRepo.findUserByEmail).toBe("function");
  });
  it("should have createUser function", () => {
    expect(typeof authRepo.createUser).toBe("function");
  });
});
