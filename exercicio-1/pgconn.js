var pg = require('pg');
var conf = {
  host: "127.0.0.1",
  database: "nodejs",
  user: "postgres",
  password: "teste",
  port: 5432};
var conn = new pg.Pool(conf);
function conectar(conf){
    if(!conn){
      try{
      var pool = new pg.Pool(conf);
      pool.connect();
      return pool;
      }catch(exc){
        console.log(exc);
      }
      
    }
    return conn;
    
};
conn = conectar();
module.exports.getConexao = conn;