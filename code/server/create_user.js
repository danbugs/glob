const pg = require('pg');
var conString = process.env.CON_STRING;
export function create_user(user){
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