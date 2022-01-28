const bodyParser = require("body-parser");
const express = require("express");
const speakeasy = require("speakeasy");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("This is working");
});

app.post("/generarToken", (req, res) => {
  if (!req.query.cliente) {
    res.status(400).json("No username provided");
  }
  const client = req.query.cliente;
  const mySecret = speakeasy.generateSecret({ length: 8 });
  res.send({
    cliente: client,
    token: speakeasy.totp({
      secret: mySecret.base32,
      encoding: "base32",
    }),
    remaining: 30 - Math.floor((new Date().getTime() / 1000.0) % 30),
    secret: mySecret.base32,
  });
});

app.post("/usarToken", (req, res) => {
  if (!(req.query.cliente && req.query.token)) {
    res.status(400).json("No token provided");
  }
  const client = req.query.cliente;
  const token = req.query.token;
  const secret = req.query.secret;
  res.send({
    valid: speakeasy.totp.verify({
      secret: secret,
      encoding: "base32",
      token: token,
      window: 0,
    }),
  });
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
