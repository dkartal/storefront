import { User, UserStore } from "../../models/User";

const userStore = new UserStore();

const user1 = {
  firstname: "firstName",
  lastname: "lastName",
  password: "password"
} as User;
const user2 = {
  firstname: "firstName2",
  lastname: "lastName2",
  password: "password2"
} as User;

const user3 = {
  firstname: "firstName3",
  lastname: "lastName3",
  password: "XXXXXXXXX"
} as User;

describe("User Model", () => {
  it("should have all CRUD methods", () => {
    expect(userStore.getAll).toBeDefined();
    expect(userStore.getById).toBeDefined();
    expect(userStore.create).toBeDefined();
    expect(userStore.authenticate).toBeDefined();
  });

  it("should create a new user", async () => {
    const result = await userStore.create(user1);

    expect(result.firstname).toEqual(user1.firstname);
    expect(result.lastname).toEqual(user1.lastname);
    expect(result.password).not.toEqual(user1.password);
  });

  it("should return a list of users", async () => {
    await userStore.create(user2);

    const result = await userStore.getAll();
    expect(result.length).toBeGreaterThan(0);
  });

  it("should return the correct user", async () => {
    const result = await userStore.create(user3);

    expect(result.id).toBeDefined();
    expect(result).toEqual(await userStore.getById(result.id || 0));
  });

  it("should authenticate a user with valid credentials", async () => {
    const result = await userStore.create({
      firstname: "Johnsd",
      lastname: "Doesdf",
      password: "XXXXXXXXXXXsdf"
    });
    const isAuthenticated = await userStore.authenticate(
      result.firstname,
      result.lastname,
      "XXXXXXXXXXXsdf"
    );
    expect(isAuthenticated).not.toBeNull();
  });

  it("should not authenticate a user with invalid credentials", async () => {
    const result = await userStore.create({
      firstname: "John",
      lastname: "Doe",
      password: "XXXXXXXXXXX"
    });
    const isAuthenticated = await userStore.authenticate(
      result.firstname,
      result.lastname,
      "wrongpassword"
    );
    expect(isAuthenticated).toBeNull();
  });
});
