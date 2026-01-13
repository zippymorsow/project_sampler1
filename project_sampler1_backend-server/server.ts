import * as fs from 'fs';
import * as cons from './constants';
import express, { Request, Response } from 'express';
import cors from 'cors';


const app = express();

// Allow requests from Angular frontend
app.use(cors({
  origin: 'http://' + cons.SERVER_CONFIG.host + ':' + cons.SERVER_CONFIG.web_port,  // frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));


app.use(express.json());

// GET users
app.get('/api/users', (req: Request, res: Response) => {
  fs.readFile(cons.JSON_file.users, 'utf8', (err, data) => {
    const parsedData = data ? JSON.parse(data) : [];
    if (err) return res.status(500).send('Error reading file');
    res.json(parsedData);
  });
});

app.get('/api/usersremoved', (req: Request, res: Response) => {
  fs.readFile(cons.JSON_file.usersremoved, 'utf8', (err, data) => {
    const parsedData = data ? JSON.parse(data) : [];
    if (err) return res.status(500).send('Error reading file');
    res.json(parsedData);
  });
});

// POST users
app.post('/api/users', (req: Request, res: Response) => {
  fs.writeFile(cons.JSON_file.users, JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).send('Error saving file');
    res.send({ message: 'Users saved successfully' });
  });
});

app.post('/api/usersremoved', (req: Request, res: Response) => {
  fs.writeFile(cons.JSON_file.usersremoved, JSON.stringify(req.body, null, 2), err => {
    if (err) return res.status(500).send('Error transfered to remove file file');
    res.send({ message: 'Users transfered to remove file successfully' });
  });
});

app.listen(cons.SERVER_CONFIG.port, () => console.log('Server running on http://' + cons.SERVER_CONFIG.host + ':' + cons.SERVER_CONFIG.port));