import * as path from 'path';

export const ENDPOINTS_DETAILS = {
    users: {path : 'assets/data/users.json' , endpoint: '/api/users'},
    usersremoved: {path : 'assets/data/usersremoved.json' , endpoint: '/api/usersremoved'},
};

export const SERVER_CONFIG = {
    api_port: 3000,
    host: 'localhost',
    web_port: 4200,
};