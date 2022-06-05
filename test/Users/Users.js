import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2/"); // API requests

import { expect } from "chai"; // assertion library

describe('Get Users', () => {
    it("GET /users", (done) => {
        request
        .get(`users?access-token=${process.env.TEST_TOKEN}`)
        .end((err, res) => {
            expect(res.body).to.not.be.empty;
            done();
        })
    })
})

export * as default from "../Users/Users.js";