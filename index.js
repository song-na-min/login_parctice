const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://song-na-min:namin0707@loginpractice.zygd9yj.mongodb.net/?retryWrites=true&w=majority',{
    
}).then(()=>console.log("mongodb connected.."))
    .catch(err=>console.log(err))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})