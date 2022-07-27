const express = require("express");
const { rootRouter } = require("./router/root_router");
const app = express()


require('dotenv').config()

app.use(express.json());

app.use('/api', rootRouter)
const PORT =  process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("server is running!!")
})
