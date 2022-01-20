const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
var file = require('fs/promises');
const DatabaseConnection = require('./pgconn');
app.use(bodyParser.json());
app.use(function (req, res, next) {
  var data = new Date();
  var stringData = data.toISOString();
  file.appendFile("./log.txt",`${stringData} - ${req.method} - ${req.url}\n`).then((sucess) => {
    next();
  })
  
});
app.get('/usuarios', async (req, res) => {
    const databaseConnection = new DatabaseConnection();
    const db = await databaseConnection.connect();
    let resultado = await db.query("SELECT * FROM users");
    res.statusCode = 200;
    return res.send( resultado.rows);
});
app.get('/usuarios/:id', async (req, res) => {
  const databaseConnection = new DatabaseConnection();
  const db = await databaseConnection.connect();
  let resultado = await db.query("SELECT * FROM users where id = $1", [req.params.id]);
  res.statusCode = 200;
  if(resultado.rows.length == 0){

    res.statusCode = 400;
    return res.send("");
  }
  return res.send( resultado.rows[0]);
});

app.post('/usuarios', async (req, res) => {
  const databaseConnection = new DatabaseConnection();
    const db = await databaseConnection.connect();
  let objeto =  await db.query(`insert into users (name, email,password,createdAt, updatedAt) values
      ($1, $2, $3, NOW(), NOW()) RETURNING *;
    `, [req.body.name, req.body.email, req.body.password]);
  res.statusCode = 201;
  return res.send(objeto.rows[0]);
}
);
app.put('/usuarios/:id', async (req, res) => {
  const databaseConnection = new DatabaseConnection();
    const db = await databaseConnection.connect();
  let objeto =  await db.query(`update users set
      name = $1,email = $2, password= $3, updatedAt =  NOW() where id = $4;
    `, [req.body.name, req.body.email, req.body.password, req.params.id]);
  let resultado = await getConexao.query("SELECT * FROM users where id = $1", [req.params.id]);
  res.statusCode = 201;
  return res.send(resultado.rows[0]);
}
);


app.delete('/usuarios/:id', async (req, res) => {
  const databaseConnection = new DatabaseConnection();
    const db = await databaseConnection.connect();
  let objeto =  await db.query(`delete from users where id = $1;
    `, [req.params.id]);
  res.statusCode = 200;
  return res.send("");
}
);
app.listen(port, () => {
  console.log(`server is running in http://localhost:${port}`)
});