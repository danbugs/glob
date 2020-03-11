const express = require('express');
const cors = require('cors');
const pg = require('pg');
const app = express();
app.use(cors());
app.use(express.json());
var conString = process.env.CON_STRING;

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

function create_user(user){
    var client = new pg.Client(conString);
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
}

function view_users(){
    var client = new pg.Client(conString);
    client.connect(function(err) {
        if(err) {
            return console.log('could not connect to postgres', err);
        }
        client.query(`SELECT * FROM blogUser;`, function(err, result) {
            if(err) {
                return console.log('error running query', err);
            }
            console.log(result.rows);
            client.end();
        });
    });
}