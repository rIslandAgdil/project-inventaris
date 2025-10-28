const barangRepo = require("../repositories/barangRepository");

describe("Barang Repository", () => {
  it("should have createBarang function", () => {
    expect(typeof barangRepo.createBarang).toBe("function");
  });
  it("should have getAllBarang function", () => {
    expect(typeof barangRepo.getAllBarang).toBe("function");
  });
  it("should have getBarangById function", () => {
    expect(typeof barangRepo.getBarangById).toBe("function");
  });
  it("should have updateBarang function", () => {
    expect(typeof barangRepo.updateBarang).toBe("function");
  });
  it("should have deleteBarang function", () => {
    expect(typeof barangRepo.deleteBarang).toBe("function");
  });
});
