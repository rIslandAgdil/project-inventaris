const userRepo = require("../repositories/userRepository");

describe("User Repository", () => {
  it("should have findAllUsers function", () => {
    expect(typeof userRepo.findAllUsers).toBe("function");
  });
  it("should have findUserById function", () => {
    expect(typeof userRepo.findUserById).toBe("function");
  });
  it("should have findUserByEmail function", () => {
    expect(typeof userRepo.findUserByEmail).toBe("function");
  });
  it("should have createUser function", () => {
    expect(typeof userRepo.createUser).toBe("function");
  });
  it("should have updateUser function", () => {
    expect(typeof userRepo.updateUser).toBe("function");
  });
  it("should have deleteUser function", () => {
    expect(typeof userRepo.deleteUser).toBe("function");
  });
});
