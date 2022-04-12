const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

////Routes: 
// (GET to see all notes) 
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// (POST to add note) 
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newNote);
                
                fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) =>
                    err ? console.error(err) : console.info(`\nData written to ${destination}`)
                );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };
        console.log(response);
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

// (DELETE to remove notes)
app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user')
})



//// GET Route for homepage
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);