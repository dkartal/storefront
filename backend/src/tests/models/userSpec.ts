import { User, UserStore } from "../../models/User";

const userStore = new UserStore();

const user = {
  firstname: "firstName",
  lastname: "lastName",
  password: "password"
} as User;

describe("User Model", () => {
  it("should have all CRUD methods", () => {
    expect(userStore.getAll).toBeDefined();
    expect(userStore.getById).toBeDefined();
    expect(userStore.create).toBeDefined();
    expect(userStore.authenticate).toBeDefined();
  });

  it("should create a new user", async () => {
    const result = await userStore.create(user);

    expect(result.firstname).toEqual(user.firstname);
    expect(result.lastname).toEqual(user.lastname);
    expect(result.password).not.toEqual(user.password);
  });

  it("should return the correct user", async () => {
    const result = await userStore.create(user);

    expect(result.id).toBeDefined();
    expect(result).toEqual(await userStore.getById(result.id || 0));
  });

  it("should authenticate a user with valid credentials", async () => {
    const result = await userStore.create(user);
    const isAuthenticated = await userStore.authenticate(
      result.firstname,
      result.lastname,
      user.password
    );
    expect(isAuthenticated).not.toBeNull();
  });

  it("should not authenticate a user with invalid credentials", async () => {
    const result = await userStore.create(user);
    const isAuthenticated = await userStore.authenticate(
      result.firstname,
      result.lastname,
      user.password + "wrongpassword"
    );
    expect(isAuthenticated).toBeNull();
  });

  it("should return a list of users", async () => {
    const response = await userStore.create(user);

    const result = await userStore.getAll();
    expect(result).toContain(response);
  });
});
