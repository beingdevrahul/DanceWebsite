const express=require('express');
// const fs=require('fs');
const path=require('path');
const app=express();
const bodyparser=require('body-parser')
const port=5000;

//to use mongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

//define the schema in MongoDB
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
    
  });

  const contact = mongoose.model('contactDance', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    
    const params = {}
    res.status(200).render('contact.pug', params);
})

//database 
app.post('/contact', (req, res)=>{
    
    let myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(404).send("this item has not been saved to the database");
    })

    // res.status(200).render('contact.pug', params);
})
app.get('/about', (req, res)=>{
    
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/classInfo', (req, res)=>{
    
    const params = {}
    res.status(200).render('classifo.pug', params);
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});