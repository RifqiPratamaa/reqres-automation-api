import 'dotenv/config';

export const Config = {
    BASE_URL: process.env.BASE_URL || 'https://reqres.in/api',
    API_KEY: process.env.API_KEY || 'default-key'
};