require('dotenv').config()
const massive = require('massive')
const express = require('express')
const session = require('express-session')
const app = express()
const PORT = 4000
const {SESSION_SECRET, CONNECTION_STRING} = process.env;
const authCtrl = require('./controllers/authController')

app.use(express.json())
 
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then((db) => {
    app.set('db', db)
    console.log('db connected')
}).catch(err => console.log(err))

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)



app.listen(PORT, console.log(`server activated port ${PORT}`))