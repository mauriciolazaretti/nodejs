const { Pool } = require("pg")
var conf = {
  host: "127.0.0.1",
  database: "nodejs",
  user: "postgres",
  password: "teste",
  port: 5432};
  class DatabaseConnection {
    constructor() {
      if (!DatabaseConnection._instance) {
        DatabaseConnection.connectDB = null;
        DatabaseConnection._instance = this;
      }
      return DatabaseConnection._instance;
    }
  
    async connect() {
      try {
        return await this._connection();
      } catch (e) {
        this.connectDB = null;
        return await this._connection();
      }
    }
  
    async _connection() {
      if (DatabaseConnection.connectDB) {
          return DatabaseConnection.connectDB;
      }
      console.log('entrou aqui');
      const pool = new Pool({
        connectionString:
          "postgres://postgres:teste@127.0.0.1/nodejs",
      });
      const client = await pool.connect();
      DatabaseConnection.connectDB = pool;
      const res = await client.query("SELECT NOW()");
      console.log(res.rows[0]);
      client.release();
      return pool.connect();
    }
  }
  
  module.exports = DatabaseConnection;