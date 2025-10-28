const ruanganRepo = require("../repositories/ruanganRepository");

describe("Ruangan Repository", () => {
  it("should have createRuangan function", () => {
    expect(typeof ruanganRepo.createRuangan).toBe("function");
  });
  it("should have getAllRuangan function", () => {
    expect(typeof ruanganRepo.getAllRuangan).toBe("function");
  });
  it("should have getRuanganById function", () => {
    expect(typeof ruanganRepo.getRuanganById).toBe("function");
  });
  it("should have updateRuangan function", () => {
    expect(typeof ruanganRepo.updateRuangan).toBe("function");
  });
  it("should have deleteRuangan function", () => {
    expect(typeof ruanganRepo.deleteRuangan).toBe("function");
  });
});
