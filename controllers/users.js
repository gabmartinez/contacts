var express = require('express')
var firebase = require("firebase")
const config = require('../credential')

var router = express.Router()
firebase.initializeApp(config)
const auth = firebase.auth()

router.get('/', (req, res) => {
    res.render('login', { section: 'Login'})
})

router.post('/login', (req, res) => {
    auth.signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
        res.redirect('/')
    }).catch((error) => {
        res.render('login', { section: 'Login', message: error.message })
    });
})

router.get('/logout', (req, res) => {
    auth.signOut().then(() => {
        res.redirect(req.baseUrl + '/')
    }).catch((error) => {
      res.status(500).render("Something Wrong!")
    })
})

module.exports = router