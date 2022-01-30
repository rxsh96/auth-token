const bodyParser = require("body-parser");
const express = require("express");
const speakeasy = require("speakeasy");
const knex = require("knex");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const reader = fs.readFileSync("config.json");
const config = JSON.parse(reader);

const db = knex({
  client: "pg",
  connection: config,
});

app.get("/", (req, res) => {
  res.send("Server running");
});

app.post("/generarToken", async (req, res) => {
  if (!req.query.cliente) {
    res.status(400).json("No username provided");
    return;
  }

  const client = req.query.cliente;
  let token;

  const data = await db("myclients")
    .where({
      username: client,
    })
    .select("username", "secret")
    .then((data) => {
      return data;
    });

  if (data.length === 0) {
    const secret = speakeasy.generateSecret({ length: 8 });
    token = speakeasy.totp({
      secret: secret.base32,
      encoding: "base32",
    });
    db("myclients")
      .insert({
        username: client,
        token: token,
        secret: secret.base32,
      })
      .then((res) => res);
  } else {
    token = speakeasy.totp({
      secret: data[0]["secret"],
      encoding: "base32",
    });

    db("myclients")
      .where("username", "=", client)
      .update({
        token: token,
      })
      .then((res) => res);
  }

  res.send({
    cliente: client,
    token: token,
    remaining: 60 - Math.floor((new Date().getTime() / 1000.0) % 60),
  });
});

app.post("/usarToken", async (req, res) => {
  if (!(req.query.cliente && req.query.token)) {
    res.status(400).json("No token provided");
    return;
  }

  const client = req.query.cliente;
  const token = req.query.token;

  const data = await db("myclients")
    .where({
      username: client,
    })
    .select("secret")
    .then((data) => {
      return data;
    });

  if (data.length === 0) {
    res.status(400).json("Client does not exist");
    return;
  }

  res.send({
    valid: speakeasy.totp.verify({
      secret: data[0]["secret"],
      encoding: "base32",
      token: token,
      window: 0,
    }),
  });
});

app.listen(3001, () => {
  console.log("App is running on port 3001");
});
