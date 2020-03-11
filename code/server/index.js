import {create_user} from './create_user.js';
import {get_trending_posts} from './get_trending_posts.js';

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
app.post('/get_trending_posts', (req, res) => {
    console.log(req.body);
    res.send(get_trending_posts());
});
app.listen(3000, () => {
    console.log(process.env.PORT);
});
