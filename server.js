const express = require('express')
const port = 3000
const app = express()
const favicon = require('serve-favicon')

app.use(favicon(__dirname + '/static/images/favicon.ico'))

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

// Стартова сторінка загрузка всіх карток

app.get('/', async (req,res)=>{
  let notes = []
  await app.db.find().forEach((el) => {
    notes.push(el)   
  });
  res.render("index", {notes})
})

// Роут GET /notes, который будет отдавать HTML страницу с формой создания заметки.

app.get('/notes', async (req,res)=>{
  res.render("create-note")
})

app.get('/lists', async (req,res)=>{
  res.render("create-list")
})

// Роут GET /notes/${id}, который будет отдавать HTML страницу детального отображения заметки.

app.get('/id/:id', async (req, res)=>{
  let note = []
  let id = +req.params.id
  console.log('id-wtf', id)
  await app.db.find({id: id}).forEach((el)=>{
      note.push(el)
  })
  res.render('note', {note})
});

// Роут POST /api/notes для создания заметки.

app.post('/api/notes', async (req, res)=>{
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

app.post('/api/lists', async (req, res)=>{
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


// Роут PUT /api/notes/${id} для редактирования заметки.

app.get('/api/notes/:id', async (req, res)=>{
  let id = +req.params.id
  let card
  await app.db.find({id: id}).forEach((el)=>{
    card =el
  })
  console.log('card', card)

  res.render("update-card", {card})
})

app.put('/api/notes/:id', async (req, res)=>{
  console.log('req.body.id', req.body.id)
  try{
   await app.db.updateOne({
    id: +req.body.id
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
app.get('/api/lists/:id', async (req, res)=>{
  let id = +req.params.id
  let list
  await app.db.find({id: id}).forEach((el)=>{
    list =el
  })
  console.log('list', list)

  res.render("update-list", {list})
})

app.put('/api/lists/:id', async (req, res)=>{
  console.log('req.body.id', req.body.id)
  try{
   await app.db.updateOne({
    id: +req.body.id
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
app.put('/api/lists/checked/:id', async (req, res)=>{
  console.log('req.body.id', req.body.id)
  console.log('req.body.text', req.body.text)
  try{
   await app.db.updateOne({
    id: +req.body.id
    },
    {
      $set: {
        text: req.body.text
      }
    })

  }catch(err){    
    console.log(err)
  }
  res.json({edited: true})

})
// Роут DELETE /api/notes/${id} для удаления заметки.

app.delete('/api/notes/:id', async (req, res)=>{
  console.log(+req.body.id)
  try{
    
   await app.db.deleteOne({
      id: +req.body.id
    })

  }catch(err){
    
    console.log(err)
  }
  res.json({deleted: true})
})

app.listen(port, ()=>{
  console.log(`server ${port} is working !`)
})