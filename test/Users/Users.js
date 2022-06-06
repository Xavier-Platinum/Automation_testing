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

    // single user
    it("GET /users/:id", async() => {
        return request
        .get(`users/3785?access-token=${process.env.TEST_TOKEN}`)
        .then((res) => {
            expect(res.body.id).to.be.equal(3785);
            expect(res.body).to.not.be.empty;
        })
    })

    // single user with query params
    it("GET /users with query params", async() => {
        const URL = `users?access-token=${process.env.TEST_TOKEN}&gender=female&status=active`;
        return request
        .get(URL)
        .then((res) => {
            expect(res.body).to.not.be.empty;
            // looping through to verify params
            res.body.forEach(data => {
                expect(data.gender).to.equal("female");
                expect(data.status).to.equal("active");
            });
        })
    })

    // Creating a user
    it('POST /users', async() => {
        const data = {
            email: `bencher_${Math.floor(Math.random()*9999)}@nigeria.com`,
            name: "Bencher",
            gender: "male",
            status: "active"
        };
        return request
        .post("users")
        .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
        .send(data)
        .then((res) => {
            expect(res.body).to.deep.include(data);
        })
    })

    // Updating a user
    it('PUT /users/:id', async() => {
        const data ={
            status: "active",
            name: `The-Law-${Math.floor(Math.random() * 9999)}`
        }

        return request
        .put('/users/4308')
        .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
        .send(data)
        .then((res) => {
            expect(res.body).to.deep.include(data);
        })
    })
})

export * as default from "../Users/Users.js";