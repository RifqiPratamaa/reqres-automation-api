import request from 'supertest';
import { Config } from '../config/environment';

export const UserService = {
    createUser: (payload: object) => 
        request(Config.BASE_URL)
            .post('/users')
            .send(payload)
            .set('x-api-key', Config.API_KEY)
            .set('Content-Type', 'application/json'),
    
    getUsersPage: (page: number) => 
        request(Config.BASE_URL)
            .get('/users')
            .query({ page })
            .set('x-api-key', Config.API_KEY)
            .set('Content-Type', 'application/json'),

    getUsersWithInvalidAuth: (page: number) => 
        request(Config.BASE_URL)
            .get('/users')
            .query({ page })
            .set('x-api-key', 'INVALID_KEY_123')
            .set('Content-Type', 'application/json'),
    
    updateUser: (id: number, payload: object) => 
        request(Config.BASE_URL)
            .put(`/users/${id}`)
            .send(payload)
            .set('x-api-key', Config.API_KEY)
            .set('Content-Type', 'application/json'),
    
    getUserDetail: (id: number) => 
        request(Config.BASE_URL)
            .get(`/users/${id}`)
            .set('x-api-key', Config.API_KEY)
            .set('Content-Type', 'application/json'),
    
    deleteUser: (id: number) => 
        request(Config.BASE_URL)
            .delete(`/users/${id}`)
            .set('x-api-key', Config.API_KEY)
            .set('Content-Type', 'application/json')
};