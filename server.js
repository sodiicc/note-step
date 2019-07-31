const express = require('express')
const port = 3000
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://sodiicc:trader32@cluster0-rsnt4.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  console.log(err)
  const collection = client.db("step").collection("notes");
  app.db = collection
})


app.use(express.static(__dirname + "/static"))

app.set('view engine', 'ejs')

app.get('/', async (req,res)=>{
  let notes = []
  await app.db.find().forEach((el) => {
    notes.push(el)   
  });
  res.render("index", {notes})
})

app.post('/create', async (req, res)=>{
  console.log(req.body)
  try{
   await app.db.insertOne({
      ...req.body
    })

  }catch(err){    
    console.log(err)
  }
  res.json({created: "true"})
})
app.post('/edit', async (req, res)=>{
  console.log(req.body)
  try{
   await app.db.updateOne({
    id: req.body.id
    },
    {
      $set: {
        title: req.body.title,
        text: req.body.text
      }
    })

  }catch(err){    
    console.log(err)
  }
  res.json({edited: true})
})
app.post('/delete', async (req, res)=>{
  console.log(req.body)
  try{
    
   await app.db.deleteOne({
      id: req.body.id
    })

  }catch(err){
    
    console.log(err)
  }
  res.json({deleted: true})
})

app.get('/:id', async (req, res)=>{
  let note = []
  let id = req.params.id
  await app.db.find({id: id}).forEach((el)=>{
      note.push(el)
  })
  res.render('note', {note})
  console.log('note.title', note[0].title)
})

app.listen(port, ()=>{
  console.log(`server ${port} is working !`)
})