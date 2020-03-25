const express = require('express');
const cors = require('cors');
const pg = require('pg');

let conString = process.env.CON_STRING;
let client = new pg.Client(conString);

const app = express();
app.use(cors());
app.use(express.json());

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
  const query = {
    name: 'register',
    text: 'INSERT INTO blogUser VALUES ($1, $2, $3);',
    values: [req.body.username, req.body.pwd, req.body.email]
  }
  client.query(query, function(err, result) {
    if(err){
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
  })
});

app.post('/search', (req, res) => {
  const query = {
    name: 'search',
    text: 'SELECT * FROM blogUser WHERE username LIKE $1;',
    values: [`%${req.body.search}%`]
  }
  client.query(query, function(err, result) {
    if(err) {
      console.log('error running query', err);
      res.status(500);
      res.send({
          message: err.message
      });      
    }
    res.status(200);
    res.send(result.rows);
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

app.post('/blog', (req, res) => {
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
  const query = {
    name: 'login',
    text: 'SELECT * FROM blogUser WHERE username=$1 AND password=$2;',
    values: [req.body.username, req.body.pwd]
  }
  client.query(query, function(err, result) {
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

app.post('/post/views', (req, res) => {
  client.query(`UPDATE blogPost SET views = views + 1 WHERE postid = ${req.body.postid};`, function(err, result) {
    if(err){
      console.log('error running query', err);
      res.status(500);
      res.send({
          message: err.message
      });
    }
    res.status(200);
    res.send({
      message: 'views++'
    });
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
  const query = {
    name: 'make_post',
    text: 'INSERT INTO blogPost(pcontent, title, username, views)  VALUES ($1, $2, $3, 0);',
    values: [req.body.pcontent, req.body.title, req.body.username]
  }
  client.query(query, function(err, result) {
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

app.post('/post/comment', (req, res) => {
  const query = {
    name: 'comment',
    text: 'INSERT INTO blogComment (content, postID, username) VALUES ($1, $2, $3);',
    values: [req.body.content, req.body.postID, req.body.username]
  }
  client.query(query, function(err, result) {
    if(err){
      console.log('error running query', err);
      res.status(500);
      res.send(err.message);
    }
    res.status(200);
    res.send({
      message: "comment"
    });
  });
});

app.post('/post/fetch_comments', (req, res) => {
  const query = {
    name: 'fetch_comment',
    text: 'SELECT * FROM blogComment WHERE postID = $1',
    values: [req.body.postid]
  }
  client.query(query, function(err, result) {
    if(err){
      console.log('error running query', err);
      res.status(500);
      res.send(err.message);
    }
    res.status(200);
    res.send(result.rows);
  });
});

app.listen(3000);
