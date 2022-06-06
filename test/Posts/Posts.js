import supertest from "supertest";
const request = supertest("https://gorest.co.in/public/v2/"); // API requests

import { expect } from "chai"; // assertion library
import { user } from "../Users/Users.js";

describe('Posts', () => {

    describe('POST', () => {
        // create post
        describe('Create Post', () => {
            it('/posts', async () => {
                const data = {
                    user_id: user[3].id,
                    title: `New Post Title`,
                    body: "The Post was created successfully"
                }
                const res = await request
                .post("posts")
                .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
                .send(data)
                expect(res.body).to.deep.include(data);
            })
        });
        
    });
    
});



export * as default from "../Posts/Posts.js";