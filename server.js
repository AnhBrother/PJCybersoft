const express = require("express");
const { rootRouter } = require("./router/root_router");
const app = express()
const path = require('path')

require('dotenv').config()

app.use(express.json());
app.get('/', (req, res) => {  
  var signupfile = path.join(__dirname, 'index.html')
  res.sendFile(signupfile)
})
app.use('/api', rootRouter)
const PORT =  process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("server is running!!")
})
