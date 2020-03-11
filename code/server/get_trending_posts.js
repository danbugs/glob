const pg = require('pg');
var conString = process.env.CON_STRING;
export function get_trending_posts(){
  var client = new pg.Client(conString);
  client.connect(function(err){
    if(err){
      return console.log('could not connect to postgres', err);
    }
    client.query(`SELECT pContent FROM blogPost WHERE username='sheyla';`, function(err, result){
      if(err){
        return console.log('error running query', err);
      }
      console.log(result.rows);
      client.end();
    })
  })
}
