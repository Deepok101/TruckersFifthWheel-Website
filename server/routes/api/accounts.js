const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const session = require('express-session');
const mongoURI = require('../../MongoURI')
const MongoStore = require('connect-mongo')(session)
const bcrypt = require('bcrypt');

//Item Model
const Accounts = require('../../models/accounts')

router.use(session({
	secret: 'secret',
	resave: true,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
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

router.post('/auth', urlencodedParser, (req, res1) => {
    var user = req.body.username;
    var pass = req.body.password;

    Accounts.findOne({username: user}, function(error, result){
        if (result) {
            bcrypt.compare(pass, result.password, (err, res)=> {
                if (res){
                    req.session.isAuthenticated = true;
                    res1.status(200).send({"result": result, "session": req.session.isAuthenticated});
                } else {
                    res1.status(404).end()
                }
            })
        } else {
            res1.status(404).end()
        }
    })
})
router.post('/create', urlencodedParser, (req, res)=>{
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

    bcrypt.hash(password, 8, (err, hash)=>{
        const newAccount = new Accounts({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: hash
        })
        newAccount.save().then(post => res.json(post))
    })
})

router.get('/auth', (req, res)=>{
    res.send({"session": req.session.isAuthenticated});
})

router.get('/auth/logout', (req, res)=>{
    req.session.isAuthenticated = false;
    res.send({"session": req.session.isAuthenticated});
})


module.exports = router;
