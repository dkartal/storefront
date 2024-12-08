import e from "express";
import { User, UserStore } from "../../models/User";
import exp from "constants";

const userStore = new UserStore();

describe("User Model", () => {
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

  it("should have a getAll method", () => {
    expect(userStore.getAll).toBeDefined();
  });

  it("should have a getById method", () => {
    expect(userStore.getById).toBeDefined();
  });

  it("should have a create method", () => {
    expect(userStore.create).toBeDefined();
  });

  it("should create a new user", async () => {
    const result = await userStore.create(user1);

    console.log("result", result);
    expect(result.firstname).toEqual(user1.firstname);
    expect(result.lastname).toEqual(user1.lastname);
    expect(result.password).toEqual(user1.password);
  });

  it("should return a list of users", async () => {
    await userStore.create(user2);

    const result = await userStore.getAll();
    expect(result.length).toBe(2);
  });

  it("should return the correct user", async () => {
    const result = await userStore.create(user3);

    expect(result.id).toBeDefined();
    expect(result).toEqual(await userStore.getById(result.id || 0));
  });
});
