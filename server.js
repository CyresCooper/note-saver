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
    fs.readFile(__dirname + "/db/db.json", function (error, notes) {
      if (error) {
        return console.log(error)
      }
      notes = JSON.parse(notes)
      let id = Math.floor(Math.random()*1000)
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
  
  
  function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

        
        }
    }
}
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));