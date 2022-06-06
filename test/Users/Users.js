import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2/"); // API requests

import { expect } from "chai"; // assertion library

let user = [];
export {user};

describe('Users', () => {
    
    // optimizing tests
    describe('POST', async() => {
        // Creating a user
        it('/users', async() => {
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
                // user = res.body;
            })
        })
    });
    

    describe('GET Requests', async() => {
        describe('users', async() => {
            it("/users", (done) => {
                request
                .get(`users?access-token=${process.env.TEST_TOKEN}`)
                .end((err, res) => {
                    expect(res.body).to.not.be.empty;
                    res.body.forEach((data) => {
                        user.push(data)
                    })
                    done();
                })
            })
        });
        
    
        describe('Single User', async() => {
            // single user
            it("/users/:id", async() => {
                return request
                .get(`users/${user[0].id}`)
                .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
                .then((res) => {
                    expect(res.body.id).to.be.eql(user[0].id);
                    expect(res.body).to.not.be.empty;
                })
            })
        });
        
    
        describe('Users by params', async() => {
            // single user with query params
            it("/users", async() => {
                const URL = `users?access-token=${process.env.TEST_TOKEN}&gender=female&status=active`;
                return request
                .get(URL)
                .then((res) => {
                    expect(res.body).to.not.be.empty;
                    // looping through to verify params
                    res.body.forEach(data => {
                        expect(data.gender).to.eql("female");
                        expect(data.status).to.eql("active");
                    });
                })
            })
        });
    });
    
    

    // Updating a user
    describe('PUT Updating a user', async() => {
        it('/users/:id', async() => {
            const data ={
                status: "active",
                name: `The-Law-${Math.floor(Math.random() * 9999)}`
            }
    
            return request
            .put(`/users/${user[0].id}`)
            .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
            .send(data)
            .then((res) => {
                expect(res.body).to.deep.include(data);
            })
        })
    });
    

    // Deleting a user
    describe('DELETE Deleting a user', async() => {
        it('/users/:id', async () => {
            return request
            .delete(`/users/${user[0].id}`)
            .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
            .then((res) => {
                expect(res.body).to.be.eql({});
            })
        })
    });
    
})
export * as default from "../Users/Users.js";