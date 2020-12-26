const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lstxm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express()

app.use(bodyParser.json());
app.use(cors());
//app.use(express.static('doctors'));
//app.use(fileUpload());


const port = 5000;

app.get('/', (req, res) => {
    res.send("hello  db it's working working")
})




 
 
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

client.connect(err => {
    

 let contestCollection = client.db("MU_ACM").collection("contestlink");

  app.post('/addContestLink',(req,res)=>
  {
    

      console.log(req.body);

      contestCollection.insertOne(req.body)
      .then(result=>
        {
          res.send(result.insertedCount>0)
        })
  })


  app.get('/ContestLink', (req, res) => {

    console.log('hamaisi')


    contestCollection.find({})
        .toArray((err, documents) => {

            console.log(documents);
            res.send(documents);
        })



})

  



     
 
     console.log("MU ACM DB COnnected");

    
});
 



app.listen(process.env.PORT || port)

