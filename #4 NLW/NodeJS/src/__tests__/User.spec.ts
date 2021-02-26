import request from "supertest";
import app from "../app";

import createConnection from "../database";

describe("Users", () => {
    // Criando a conexão com o db para os testes.
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    // Depois que os testes forem executados o db vai ser dropado.
    afterAll(async () => {
        const connection = await createConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to create a new user", async () => {
        const res = await request(app).post("/users").send({
            name: "John Doe",
            email: "john@doe.com",
        });

        expect(res.status).toBe(400);
    });

    it("should not be able to create a user with exist email", async () => {
        const response = await request(app).post("/users").send({
            name: "John Doe",
            email: "john@doe.com",
        });

        expect(response.status).toBe(400);
    });
});
