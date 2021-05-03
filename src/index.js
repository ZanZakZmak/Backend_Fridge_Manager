import express from 'express';
import cors from 'cors';
import data from './fridge';


const app = express(); 
const port = 3000;

app.use(express.json ());
app.use(cors())


// dohvaćanje korisnika    Radi
app.get ('/korisnici', (req, res) =>  {
    res.json(data.korisnici);
});
app.get ('/korisnici', (req, res) => {
    res.json(data.jedan_korisnik)
})

// unos novog korisnika    Radi
app.post ('/korisnici', (req, res) => {
    res.statusCode = 201;
    res.setHeader ('Location', '/korisnici/2345');
    res.send({});
});



// dohvaćanje namirnica     Radi
app.get ('/namirnice', (req, res) =>  {
    res.json(data.namirnice);
});
app.get ('/namirnice', (req, res) => {
    res.json(data.jedna_namirnica)
})

// unos nove namirnice      Radi
app.post ('/namirnice', (req, res) => {
    res.statusCode = 201;
    res.setHeader ('Location', '/namirnice/1234');
    res.send({});
});

// dohvat namirnice po nazivu    Ne radi
app.get ('/namirnice/:grocerie_name', (req, res) => {
    res.json(data.groceries.jedna_namirnica);
});




// dohvaćanje shopping lista   Radi
app.get ('/shoppingListe', (req, res) =>  {
    res.json(data.shoppingListe);
});
app.get ('/shoppingListe', (req, res) => {
    res.json(data.jedna_shoppingLista)
})

// unos nove shopping liste      Radi
app.post ('/shoppingListe', (req, res) => {
    res.statusCode = 201;
    res.setHeader ('Location', '/shoppingListe/5874');
    res.send({});
});

// dohvat shopping liste po nazivu     Ne radi
app.get ('/shoppingListe/:list_name', (req, res) =>  {
    let username = req.params.list_name
    res.json(data.shoppingListe);
});



app.listen(port, () => console.log(`Slušam na portu ${port}!`))