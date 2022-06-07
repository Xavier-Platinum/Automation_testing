import {request} from "../../config/common.js";

import { expect } from "chai"; // assertion library
import { user } from "../Users/Users.js";

let posts = [];
export {posts}

describe('Posts', () => {

    describe('POST Requests', () => {
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

    describe('GET Requests', async() => {
        // get all posts
        describe('Get all posts', async() => {
            it('/posts', async () => {
                await request
                .get("posts")
                .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
                .then(async(res) => {
                    expect(res.body).to.not.be.empty;
                    res.body.forEach(data => {
                        posts.push(data);
                    });
                })
            })
        });
        // get single post by :id
        describe('Get single post by :id', async() => {
            it('/posts/:id', async () => {
                await request
                .get(`posts/${posts[3].id}`)
                .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
                .then(async(res) => {
                    expect(200)
                })
            })
        });
    });

    // negative tests
    describe('Negative test', () => {
        describe('4** Errors', () => {
            describe('401', () => {
                it('Authentication failed', async () => {
                    const data = {
                        user_id: user[3].id,
                        title: `New Post Title`,
                        body: "The Post was created successfully"
                    }
                    const res = await request
                    .post("posts")
                    .send(data);
                    expect(res.status).to.eql(401)
                    expect(res.body.message).to.eql("Authentication failed")
                })
            });
            describe('422', () => {
                it('Validation Failed', async () => {
                    const data = {
                        user_id: user[3].id,
                        title: `New Post Title`,
                    }
                    const res = await request
                    .post("posts")
                    .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`)
                    .send(data);
                    expect(res.status).to.eql(422)
                    expect(res.body[0].field).to.eql("body")
                    expect(res.body[0].message).to.eql("can't be blank")
                })
            });
            
        });
    });
});



export * as default from "../Posts/Posts.js";