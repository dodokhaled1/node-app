const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('pubilc'))

app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', '.hbs')

const routes = require('./server/routes/user')
app.use('/', routes)
app.listen(process.env.PORT || 8000, ()=>{
    console.log('Server is running on port 8000')
})
