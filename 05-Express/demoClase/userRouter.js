const express = require("express");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("estoy en el get");
});

userRouter.post("/", (req, res) => {
  console.log(req.body);
  const {name} = req.body;
  console.log(name);
  res.send("estoy en el post");
});

userRouter.get("/5", (req, res) => {
  res.send("estoy en el detalle del usuario 5");
});

module.exports = userRouter;
