const express = require('express')
var users = require('./controllers/users')

const app = express()
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', { title: 'My Contacts', message: 'Hello World!' })
})
app.use('/auth', users)

const server = app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${server.address().port}!`);
});