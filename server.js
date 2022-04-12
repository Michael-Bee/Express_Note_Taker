const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Routes: 
// (app.GET request to see notes) 
// (app.POST request to add note) 
// //(fs.READ request to see notes) 
// //(fs.WRITE to update notes)
// (app.DELETE to remove notes)


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);