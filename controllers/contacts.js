var express = require('express')
var router = express.Router()
const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.applicationDefault()
})

var database = admin.firestore()

router.get('/', (req, res) => {
    database.collection('contacts').get()
        .then((snapshot) => {
            const contacts = []
            snapshot.forEach((doc) => {
                var contact = doc.data()
                contact.id = doc.id
                contacts.push(contact)
            })
            res.render('index', { section: 'My Contacts', contacts: contacts })
        })
    .catch((err) => {
        console.log(err)
        res.status(500).render("Something Wrong!")
    });
})

router.get('/create', (req, res) => {
    res.render('contact', { section: 'New Contact', contact: { } })
})

router.post('/', (req, res) => {
    database.collection('contacts').set({ FirstName: req.body.FirstName, LastName: req.body.LastName, Mobile: req.body.Mobile, Email: req.body.Email }).then(() => {
        res.redirect('/')
    }).catch((err) => {
        console.log(err)
        res.status(500).render("Something Wrong!")
    })
})

router.get('/update/:id', (req, res) => {
    database.collection('contacts').doc(req.params.id).get()
        .then((snapshot) => {
            var contact = snapshot.data()
            contact.id = snapshot.id
            res.render('contact', { section: 'Update Contact', contact: contact })
        }).catch((err) => {
            console.log(err)
            res.status(500).render("Something Wrong!")
        })
})

router.post('/update', (req, res) => {
    var contact = database.collection('contacts').doc(req.body.id);
    contact.update({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Mobile: req.body.Mobile,
        Email: req.body.Email
    }).then(() => {
        res.redirect('/')
    }).catch(() => {
        res.status(500).render("Something Wrong!")
    })
})

router.post('/delete/:id', (req, res) => {
    database.collection('contacts').doc(req.params.id).delete().then(() => {
        res.redirect('/')
    }).catch(() => {
        res.status(500).render("Something Wrong!")
    })
})

module.exports = router