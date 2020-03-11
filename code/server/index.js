import {create_user} from './create_user.js';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: req.url});
});

app.post('/create_user', (req, res) => {
    console.log(req.body);
    create_user(req.body);
});

app.listen(3000, () => {
    console.log(process.env.PORT);
});