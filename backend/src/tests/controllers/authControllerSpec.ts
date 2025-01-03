import supertest from "supertest";
import app from "../../app";
import { User, UserStore } from "../../models/User";

const request = supertest(app);

describe("Auth Controller E2E", () => {
  const user = {
    firstname: "XXXXX",
    lastname: "XXXXX",
    password: "XXXXX"
  } as User;

  beforeAll(async () => {
    await new UserStore().create(user);
  });

  it("should fail to login", async () => {
    const response = await request.post("/api/auth/login").send({
      firstname: "asd",
      lastname: "asd",
      password: "asd"
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Invalid credentials");
  });

  it("should login successfully", async () => {
    const response = await request.post("/api/auth/login").send(user);

    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Login successful");
  });

  it("should logout succesfully", async () => {
    const response = await request.post("/api/auth/login").send(user);
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Login successful");
    const response1 = await request.post("/api/auth/logout").send(user);
    expect(response1.status).toBe(200);
    expect(response1.body.message).toEqual("Logout successful");
  });
});
