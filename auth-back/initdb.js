const pgtools = require("pgtools");

const [dbName, postgresUser, postgresPassword] = process.argv.splice(2);

const config = {
  user: postgresUser,
  password: postgresPassword,
  port: 5432,
  host: "localhost",
};

pgtools.createdb(config, dbName, (err, res) => {
  if (err) {
    console.error(`Create DB Error Message: ${err}`);
    process.exit(-1);
  }
  console.log(res);
});
