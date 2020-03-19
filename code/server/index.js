const express = require('express');
const cors = require('cors');
const pg = require('pg');

let conString = process.env.CON_STRING;
let client = new pg.Client(conString);

client.connect(function(err){
  if(err){
      console.log('could not connect to postgres', err);
      res.status(500);
      res.send({
          message: err.message
      });
  }else{
    console.log('connection OK');
  }
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: req.url});
});

app.get('/index', (req, res) => {
  client.query(`SELECT * FROM blogPost;`, function(err, result) {
    if(err){
      console.log('error running query', err);
      res.status(500);
      res.send({
          message: err.message
      });
    }
    res.send(result.rows);
  })
});

app.get('/admin/get_users', (req, res) => {
  client.query(`SELECT * FROM blogUser;`, function(err, result) {
    if(err){
      console.log('error running query', err);
      res.status(500);
      res.send({
          message: err.message
      });
    }
    res.send(result.rows);
  })
});

app.get('/admin/get_posts', (req, res) => {
  client.query(`SELECT * FROM blogPost;`, function(err, result) {
    if(err){
      console.log('error running query', err);
      res.status(500);
      res.send({
          message: err.message
      });
    }
    res.send(result.rows);
  })
});

app.post('/register', (req, res) => {
  client.query(`INSERT INTO blogUser VALUES ('${req.body.username}', '${req.body.pwd}', ${false}, '${req.body.email}', '');`, function(err, result) {
    if(err) {
      console.log('error running query', err);
      res.status(500);
      res.send({
          message: err.message
      });      
    }
    res.status(200);
    res.send({
      message: "registered"
    });
  });
});

app.post('/admin/delete_user', (req, res) => {
  client.query(`DELETE FROM blogUser WHERE username = '${req.body.username}';`, function(err, result) {
    if(err){
      console.log('error running query', err);
      res.status(500);
      res.send({
          message: err.message
      });
    }
    res.status(200);
    res.send({
      message: "deleted user"
    });
  })
});

app.post('/my_blog', (req, res) => {
  client.query(`SELECT * FROM blogPost WHERE username = '${req.body.username}';`, function(err, result) {
    if(err){cd
      console.log('error running query', err);
      res.status(500);
      res.send({
          message: err.message
      });
    }
    res.status(200);
    res.send(result.rows);
  })
});

app.post('/delete_post', (req, res) => {
  client.query(`DELETE FROM blogPost WHERE postid = '${req.body.postid}';`, function(err, result) {
    if(err){
      console.log('error running query', err);
      res.status(500);
      res.send({
          message: err.message
      });
    }
    res.status(200);
    res.send({
      message: "deleted post"
    });
  })
});

app.post('/login', (req, res) => {
  client.query(`SELECT * FROM blogUser WHERE username='${req.body.username}' AND password='${req.body.pwd}';`, function(err, result) {
    if(err){
      console.log('error running query', err);
      res.status(500);
      res.send({
          message: err.message
      });
    }
    res.status(200);
    res.send(result.rows[0]);
  });
});

app.post('/post', (req, res) => {
  client.query(`SELECT * FROM blogPost WHERE postid='${req.body.postid}';`, function(err, result) {
    if(err){
      console.log('error running query', err);
      res.status(500);
      res.send({
          message: err.message
      });
    }
    res.status(200);
    res.send(result.rows[0]);
  });
});

app.post('/admin/query', (req, res) => {
  client.query(req.body.query, function(err, result) {
    if(err){
      console.log('error running query', err);
      res.status(500);
      res.send(err.message);
    }
    res.status(200);
    res.send(result.rows);
  });
});

app.post('/make_post', (req, res) => {
  client.query(`INSERT INTO blogPost(pcontent, title, username, likes, dislikes)  VALUES ('${req.body.pcontent}', '${req.body.title}', '${req.body.username}', 0, 0);`, function(err, result) {
    if(err){
      console.log('error running query', err);
      res.status(500);
      res.send(err.message);
    }
    res.status(200);
    res.send({
      message: "posted"
    });
  });
});

app.listen(3000);
