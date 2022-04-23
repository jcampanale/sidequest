const { request, response } = require('express')
const express = require('express'),
    mongodb = require('mongodb'),
    bodyParser = require('body-parser')
    cookieParser = require('cookie-parser');

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true})) 
app.use(cookieParser())

const uri = "mongodb+srv://user1:12345@cluster0.7vqa9.mongodb.net/test"

const client = new mongodb.MongoClient( uri, {useNewUrlParser: true, useUnifiedTopology: true});
let collection = null;
let users_collection = null;

client.connect()
    .then( () => {
        //will only create collection if doesn't exist
        return client.db( 'Users' ).collection( 'collection1' );
    })
    .then( __collection => {
        //store reference to collection
        collection = __collection;
        //blank query returns all documents
        return collection.find({ }).toArray()
    })
    .then( console.log )


client.connect()
    .then( () => {
        //will only create collection if doesn't exist
        return client.db( 'Users' ).collection( 'collection2' );
    })
    .then( __users_collection => {
        //store reference to collection
        users_collection = __users_collection;
        //blank query returns all documents
        return users_collection.find({ }).toArray()
    })
    .then( console.log )


app.get("/", (request, response) => {
  if( collection !== null){
      //get array and pass to res.json
      collection.find({ }).toArray().then( result => response.json( result));
  }
});

app.post('/login', (request, response) =>{
    let uName = request.body.username,
        psswd = request.body.password,
        userLogIn = {username: uName, password: psswd};
    
    users_collection.findOne(userLogIn)
    .then(user =>{   
        if(user){
            //login
            response.cookie('login', true)
            response.cookie('userid', user._id)
            response.cookie('username', user.username)
            response.redirect('main.html');
        }
        else{
            response.sendFile(__dirname + '/public/index.html');
        }
    })
})

app.post('/create', (request, response)=>{
    console.log("testing");
    let newUName = request.body.newUser,
        newPsswd = request.body.newPassword,
            entry = {username: newUName, password: newPsswd};
    users_collection.insertOne( entry )
    .then(regRes => users_collection.findOne(regRes.insertedId))
    .then(user=>{
        response.cookie('login', true)
        response.cookie('userid', user._id)
        response.cookie('username', user.username)
        response.redirect('main.html')
    });
})

// Start listening either on a defined port or 3000
let listener = app.listen(process.env.PORT || 3000, (e) => {
    console.log(`Example app listening at http://localhost:${listener.address().port}`)
})