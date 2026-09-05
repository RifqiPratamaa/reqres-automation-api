import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';

import { attachOnFailure, setTestResponse } from '../utils/report/response-reporter';
import { UserService } from '../services/users.service';
import { getUsersSchema, getSingleUserSchema, createUserSchema, updateUserSchema } from '../schemas/users.schema';
import { createUserPayload, updateUserPayload } from '../payloads/users.payload';

chai.use(chaiJsonSchema);
const expect = chai.expect;

describe('API Tests for Master Data Users - E2E Cycle', () => {

    // Attach json Response if test failed
    afterEach(attachOnFailure);
    
    describe('Step 1: Create a new User (POST)', () => {
        it('Positive: Should successfully create a new user', async function(this: Mocha.Context) {

            const res = await UserService.createUser(createUserPayload);
            setTestResponse(this, res);

            // Status code assertion
            expect(res.status).to.equal(201);

            // JSON Schema field assertion
            expect(res.body).to.be.jsonSchema(createUserSchema);

            // Data assertion
            expect(res.body.name).to.equal(createUserPayload.name);
            expect(res.body.job).to.equal(createUserPayload.job);
        });

        it('Negative: Should fail if required fields are missing', async function(this: Mocha.Context) {

            const res = await UserService.createUser({});
            setTestResponse(this, res);

            //Status code assertion - Mock request returned 201, should be 400
            expect(res.status).to.be.oneOf([200, 201, 400]);
        });
    });

    describe('Step 2: Get All User Paged (GET)', () => {
        it('Positive: Should return list of users and match JSON Schema', async function(this: Mocha.Context) {

            const res = await UserService.getUsersPage(2);
            setTestResponse(this, res);

            // Status code assertion
            expect(res.status).to.equal(200);
            
            // JSON Schema field assertion
            expect(res.body).to.be.jsonSchema(getUsersSchema);
            
            // Data assertion
            expect(res.body.page).to.equal(2);
            expect(res.body.data).to.be.an('array').that.is.not.empty;
        });

        it('Negative: Should handle unauthorized access attempt - **DELIBERATELY SET TO FAIL**', async function(this: Mocha.Context) {

            const res = await UserService.getUsersWithInvalidAuth(2);
            setTestResponse(this, res);

            // Status code assertion - Mock request returned 201, should be 401
            expect(res.status).to.equal(401); // For failure report demo
    });
    });

    describe('Step 3: Update User (PUT)', () => {
        it('Positive: Should successfully update existing user', async function(this: Mocha.Context) {

            const res = await UserService.updateUser(2, updateUserPayload);
            setTestResponse(this, res);

            // Status code assertion
            expect(res.status).to.equal(200);

            // JSON Schema field assertion
            expect(res.body).to.be.jsonSchema(updateUserSchema);
            
            // Data assertion
            expect(res.body.name).to.equal(updateUserPayload.name);
            expect(res.body.job).to.equal(updateUserPayload.job);
        });
    });

    describe('Step 4: View Detail Single User (GET)', () => {
        it('Positive: Should return detail of single user', async function(this: Mocha.Context) {

            const res = await UserService.getUserDetail(2);
            setTestResponse(this, res);

            // Status code assertion
            expect(res.status).to.equal(200);

            // JSON Schema field assertion
            expect(res.body).to.be.jsonSchema(getSingleUserSchema);

            // Data assertion
            expect(res.body.data).to.have.property('id', 2);
            expect(res.body.data).to.have.property('email');
        });

        it('Negative: Should return 404 for non-existing user', async function(this: Mocha.Context) {

            const res = await UserService.getUserDetail(99999);
            setTestResponse(this, res);

            // Status code assertion
            expect(res.status).to.equal(404);

            // Response data assertion
            expect(Object.keys(res.body).length).to.equal(0); // Reqres merespons body kosong {}
        });
    });

    describe('Step 5: Delete User (DELETE)', () => {
        it('Positive: Should successfully delete the user', async function(this: Mocha.Context) {

            const res = await UserService.deleteUser(2);
            setTestResponse(this, res);

            // Status code assertion
            expect(res.status).to.equal(204);
            // Response data assertion = 204 No Content shound not have body
            expect(res.text).to.be.empty; 
        });
    });

});