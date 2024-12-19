import supertest, { Response } from "supertest";
import app from "../../app";
import { User } from "../../models/User";
import { extractCookieValue } from "../helpers/extractCookieValue";

const request = supertest(app);

describe("User Controller E2E", () => {
    let response: Response, token: string | undefined;

    beforeAll(async () => {
        const user = {
            firstname: "XXXXXXXX",
            lastname: "XXXXXXXX",
            password: "XXXXXXXX",
        } as User;
        
        response = await request.post("/api/users").send(user);
        
        const response1 = await request.post("/api/auth/login").send(user);
        const cookies = response1.headers["set-cookie"] as unknown as string[];
        token = extractCookieValue(cookies, "token");
    });

    it("should create a new user", async () => {
        const u = {
            firstname: "111111111",
            lastname: "1111111",
            password: "111111",
        } as User;
        const response = await request.post("/api/users").send(u);
        expect(response.status).toBe(201);
        expect(response.body.id).toBeDefined();
        expect(response.body.firstname).toBe(u.firstname);
        expect(response.body.lastname).toBe(u.lastname);
        expect(response.body.password).not.toBe(u.password); // must be encrypted
    });

    it("should get all users (protected)", async () => {
        const res = await request.get("/api/users").send().set("Cookie", `token=${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toContain(response.body);
    });

    it("should get a user by ID (protected)", async () => {
        const res = await request.get("/api/users/" + response.body.id).send().set("Cookie", `token=${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toEqual(response.body);
    });
});