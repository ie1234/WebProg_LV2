const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/slike', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'images.json');
        const fileContent = fs.readFileSync(dataPath, 'utf8');
        const images = JSON.parse(fileContent);
        
        res.render('slike', { images: images });
    } catch (err) {
        console.error("Greška pri čitanju JSON-a:", err);
        res.status(500).send("Greška: Provjeri postoji li images.json i je li ispravan.");
    }
});

app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});