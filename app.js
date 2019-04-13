const express = require('express')
var users = require('./controllers/users')
var contacts = require('./controllers/contacts')

const app = express()
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: true }))

app.use('/', contacts)
app.use('/auth', users)

const server = app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${server.address().port}!`);
});