const express = require("express");
const { rootRouter } = require("./router/root_router");
const app = express()


require('dotenv').config()

app.use(express.json());

app.use('/api', rootRouter)

app.listen(3000, () => {
  console.log("server is running!!")
})
