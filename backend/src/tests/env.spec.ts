describe("Environment Setup", () => {
  it("should run a basic test", () => {
    expect(true).toBe(true);
  });

  it("should handle simple arithmetic", () => {
    const sum = 1 + 1;
    expect(sum).toBe(2);
  });

  it("should support asynchronous tests", async () => {
    const asyncSum = async (a: number, b: number) => a + b;
    const result = await asyncSum(2, 3);
    expect(result).toBe(5);
  });

  it("should handle Promises with done callback", (done) => {
    const asyncSum = (a: number, b: number) =>
      new Promise<number>((resolve) => setTimeout(() => resolve(a + b), 100));

    asyncSum(3, 4).then((result) => {
      expect(result).toBe(7);
      done();
    });
  });
});
