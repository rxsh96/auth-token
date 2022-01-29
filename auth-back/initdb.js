const fs = require("fs");
const { Pool } = require("pg");

const [dbName, postgresUser, postgresPassword] = process.argv.splice(2);

let config = {
  user: postgresUser,
  password: postgresPassword,
  port: 5432,
  host: "localhost",
};

const pool = new Pool(config);

pool.query(`DROP DATABASE IF EXISTS ${dbName};`, (err, res) => {
  console.log(err, res);
  console.log(`DROP ERROR: ${err}`);
  console.log(`DROP RES: ${res}`);
});

pool.query(`CREATE DATABASE ${dbName};`, (err, res) => {
  console.log(`CREATE DB ERROR: ${err}`);
  console.log(`CREATE DB RES: ${res}`);
  if (res) {
    config["database"] = dbName;
    const newPool = new Pool(config);
    newPool.query(
      "CREATE TABLE myclients(id SERIAL PRIMARY KEY, username VARCHAR(20) NOT NULL UNIQUE, secret text NOT NULL, token VARCHAR(6) NOT NULL)",
      (err, res) => {
        console.log(`CREATE TABLE ERROR: ${err}`);
        console.log(`CREATE TABLE RES: ${res}`);
        newPool.end();

        fs.writeFileSync("config.json", JSON.stringify(config));
      }
    );
  }

  pool.end();
});
