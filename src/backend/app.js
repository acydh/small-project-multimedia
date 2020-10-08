require('dotenv').config();
const express = require('express');
const db = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');

app.use(express.static(path.join(__dirname, '../../build')));

db.connect(process.env.DB_URL_PRD, {useNewUrlParser: true, useUnifiedTopology: true});

const Citta = db.model('Citta', { 
    regione: String,
    citta: String,
    popolazione: Number
});

let citta = {}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

app.use(express.urlencoded({extended: true}));

app.get("/api/regioni", function(req, res) {
    Citta.find(function (err, data) {
        citta = data
        const listaRegioni = citta.map(el => el.regione);
        res.send([...new Set(listaRegioni)]);
    });
});

app.get("/api/regioni/:regione", function(req, res) {
    const nomeRegione = req.params.regione;
    const listaCitta = citta
        .filter(el => el.regione.toLowerCase() === nomeRegione)
        .map(el => el.citta);
    res.send([...new Set(listaCitta)]);
});

app.get("/api/citta/:citta", function(req, res) {
    const nomeCitta = req.params.citta;
    const popolazione = citta
        .filter(el => el.citta.toLowerCase() === nomeCitta)
        .map(el => el.popolazione);
    res.send(popolazione);
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.post("/api/citta", function(req, res, next) {
    const nuovaCitta = new Citta({ 
        regione: req.body.regione,
        citta: req.body.citta,
        popolazione: req.body.popolazione
    });
    nuovaCitta.save().then(() => console.log('Citta inserita'));
    res.redirect('back');
});

app.listen(port);