const express = require('express');
const cors = require('cors');
const pg = require('pg');

let conString = process.env.CON_STRING;
let client = new pg.Client(conString);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: req.url});
});

app.post('/register', (req, res) => {
    client.connect(function(err) {
        if(err) {
            return console.log('could not connect to postgres', err);
        }
        client.query(`INSERT INTO blogUser VALUES ('${user.username}', '${user.pwd}', ${false}, '${user.email}', '');`, function(err, result) {
            if(err) {
                return console.log('error running query', err);
            }
            console.log(result.rows);
            client.end();
        });
    });
});

app.get('/get_trending_posts', (req, res) => {
    client.connect(function(err){
      if(err){
        return console.log('could not connect to postgres', err);
      }
      client.query(`SELECT * FROM blogPost;`, function(err, result) {
        if(err){
          return console.log('error running query', err);
        }
        res.send(result.rows);
        client.end();
      })
    })
});

app.get('/login', (req, res) => {
  client.connect(function(err) {
    if(err) {
        return console.log('could not connect to postgres', err);
    }
    client.query(`SELECT * FROM blogUser WHERE username='${user.username}' AND password='${user.pwd}', ${false};`, function(err, result) {
        if(err) {
            return console.log('error running query', err);
        }
        console.log(result.rows[0]);
        client.end();
    });
  });
})

app.listen(3000);
