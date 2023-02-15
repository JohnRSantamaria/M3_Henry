const express = require('express')

const postsRouter = express.Router();

postsRouter.get('/',(req,res)=>{
  res.send('estoy en get de posts')
});

module.exports = postsRouter;