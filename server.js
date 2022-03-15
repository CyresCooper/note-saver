const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;
const fs = require('fs');
const path = require('path');
const allNotes = require('./db/db.json');

//linking 
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//get functions 

app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.post("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
      if (error) {
        return console.log(error)
      }
      notes = JSON.parse(notes)
      let id = notes[notes.length - 1].id + 1
      let newNote = { title: req.body.title, text: req.body.text, id: id }
      let activeNote = notes.concat(newNote)
      fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), function (error, data) {
        if (error) {
          return error
        }
        console.log(activeNote)
        res.json(activeNote);
      })
    })
  })



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));