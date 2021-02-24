import request from "supertest";
import app from "../app";

import createConnection from "../database";

describe("Users", () => {
    /**
     * Antes de tudo, "rodamos" as migrations.
     */
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("should be able to create a new user", async () => {
        const res = await request(app).post("/users").send({
            name: "John Doe",
            email: "john@doe.com",
        });

        expect(res.status).toBe(201);
    });

    it("should not be able to create a user with exist email", async () => {
        const response = await request(app).post("/users").send({
            name: "John Doe",
            email: "john@doe.com",
        });

        expect(response.status).toBe(400);
    });
});
