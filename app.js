const express = require('express')

const app = express()
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index', { message: 'Hello World!' })
})

const server = app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${server.address().port}!`);
});