const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const session = require('express-session');
const mongoURI = require('../../MongoURI')
const MongoStore = require('connect-mongo')(session)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//Item Model
const Accounts = require('../../models/accounts');
const Notifications = require('../../models/notifications');

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

router.post('/notifications/all', (req, res) => {
    var receiverID = req.body.receiverID;
    Notifications.find({receiver: receiverID}).then(data => res.json(data))
})

router.post('/notifications/head', (req, res) => {
    var receiverID = req.body.receiverID;
    Notifications.find({receiver: receiverID}).limit(5).then(data => res.json(data));
})

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

router.post('/verify', (req, res)=>{
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    Accounts.findOne({firstName: firstName, lastName: lastName}).then(acc => res.json(acc))  
})

router.post('/getUserData', verifyToken, (req, res)=>{
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else { 
            res.send(authData)
        }
    })
})

router.post('/profile', (req, res)=>{
    var id = req.body.id;
    Accounts.findOne({_id: id}).then(acc => res.json(acc))
})

router.post('/connection/sendrequest', (req, res)=>{
    var userID = req.body.userID;

    var otherUserID = req.body.otherUserID;
    var username = req.body.username;
    
    var request = {
        userID: otherUserID,
        username: username

    }
    Accounts.updateOne({_id: userID}, {$push: {'profile.connections.sentRequest': request} }, (err, res)=>{
        if (err){
            console.log(err)
        }
    })
})

router.post('/connection/recrequest', (req, res)=>{
    var userID = req.body.userID;

    var otherUserID = req.body.otherUserID;
    var username = req.body.username;
    
    var request = {
        userID: otherUserID,
        username: username

    }
    Accounts.updateOne({_id: userID}, {$push: {'profile.connections.receivedRequest': request} }, (err, res)=>{
        if (err){
            console.log(err)
        }
    })
})

router.post('/connection/accept', (req, res)=>{
    var userID = req.body.userID;

    var otherUserID = req.body.otherUserID;
    var username = req.body.username;
    
    var friend = {
        userID: otherUserID,
        username: username

    }
    Accounts.updateOne({_id: userID}, {$push: {'profile.connections.friends': friend} }, (err, res)=>{
        if (err){
            console.log(err)
        }
    })
})

router.post('/update', (req, res)=>{
    var id = req.body.id;
    var bio = req.body.bio;
    var picture = req.body.picture;
    var currentPosition = req.body.currentPosition; //Object
    var highlights = req.body.highlights;
    var experience = req.body.experience;
    var education = req.body.education;
    Accounts.updateOne({_id: id}, {$set: {'profile.bio': bio, 
                                            'profile.picture': picture, 
                                            'profile.currentPosition': currentPosition,
                                            'profile.experience': experience,
                                            'profile.education': education,
                                            'profile.highlights': highlights}}).then(acc => res.json(acc))
})

router.post('/update/bio', (req, res)=>{
    var id = req.body.id;
    var bio = req.body.bio;
    var currentPosition = req.body.currentPosition; //Object

    Accounts.updateOne({_id: id}, {$set: {'profile.bio': bio, 
                                            'profile.currentPosition': currentPosition}}).then(acc => res.json(acc))
})

router.post('/update/highlights', (req, res)=>{
    var id = req.body.id;
    var highlights = req.body.highlights;

    Accounts.updateOne({_id: id}, {$set: {'profile.highlights': highlights}}).then(acc => res.json(acc))
})
router.post('/update/education', (req, res)=>{
    var id = req.body.id;
    var education = req.body.education;

    Accounts.updateOne({_id: id}, {$set: {'profile.education': education}}).then(acc => res.json(acc))
})

router.post('/update/experience', (req, res)=>{
    var id = req.body.id;
    var experience = req.body.experience;

    Accounts.updateOne({_id: id}, {$set: {'profile.experience': experience}}).then(acc => res.json(acc))
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

                    jwt.sign({user: result}, 'secretKey', (err, token)=>{
                        res1.status(200).send({"token": token, "result": result, "session": req.session.isAuthenticated});
                    })

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

function verifyToken(req, res, next){
    //Get auth header value 
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined 
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' '); 
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next()
    } else {
        //Forbiden 
        res.sendStatus(403);
    }
}


module.exports = router;
