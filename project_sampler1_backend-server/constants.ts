import * as path from 'path';

export const JSON_file = {
    users: path.join(__dirname, '../project_sampler1', 'src', 'assets', 'data', 'users.json'),
    usersremoved: path.join(__dirname, '../project_sampler1', 'src', 'assets', 'data', 'usersremoved.json'),
};

export const SERVER_CONFIG = {
    port: 3000,
    host: 'localhost',
    web_port: 4200,
};