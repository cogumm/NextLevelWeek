import request from "supertest";
import app from "../app";

import createConnection from "../database";

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("should be able to create a new survey", async () => {
        const req = await request(app).post("/surveys").send({
            title: "Title Example",
            description: "Description Example",
        });

        expect(req.status).toBe(201);
        expect(req.body).toHaveProperty("id");
    });

    it("should be able to get all surveys", async () => {
        await request(app).post("/surveys").send({
            title: "Title Example 2",
            description: "Description Example 2",
        });

        const req = await request(app).get("/surveys");

        expect(req.body.length).toBe(2);
    });
});
