const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const session = require('express-session');


//Item Model
const Accounts = require('../../models/Accounts')

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
//@route GET api/items

router.get('/', (req, res) => {
    Accounts.findOne({username: "deepok", password: "deepok"}).then(data => res.json(data))
});

router.post('/', (req, res) => {
    const newAccount = new Accounts({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    newAccount.save().then(post => res.json(post))
})
var urlencodedParser = express.urlencoded({extended: false});

router.post('/auth', urlencodedParser, (req, res) => {
    var user = req.body.username;
    var pass = req.body.password;

    Accounts.findOne({username: user, password: pass}, function(error, result){
        if (result) {
            req.session.username = user
        res.status(200).send({session: req.session.username})
        } else {
        res.send({auth: 0})
        }
    })
})


module.exports = router;
