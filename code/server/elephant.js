const pg = require('pg');
//var conString = process.env.CON_STRING;
var conString = process.env.CON_STRING;
var client = new pg.Client(conString);
client.connect(function(err) {
    if(err) {
        return console.error('could not connect to postgres', err);
    }
    client.query('SELECT * FROM blogUser;', function(err, result) {
        if(err) {
        return console.error('error running query', err);
        }
        console.log(result.rows);
        client.end();
    });
});