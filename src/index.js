import express from 'express';
import cors from 'cors';
import data from './storage';


const app = express(); 
const port = 3000;

app.use(express.json ());
app.use(cors())


// dohvaćanje korisnika   
app.get ('/korisnici', (req, res) =>  {
    res.json(data.korisnici);
});
app.get ('/korisnici/:id', (req, res) => {
    res.json(data.jedan_korisnik)
})

// unos novog korisnika   
app.post ('/korisnici', (req, res) => {
    res.statusCode = 201;
    res.setHeader ('Location', '/korisnici/2345');
    res.send({});
});



// dohvaćanje namirnica    
app.get ('/namirnice', (req, res) =>  {
    res.json(data.namirnice);
});
app.get ('/namirnice/:id', (req, res) => {
    res.json(data.jedna_namirnica)
})

// unos nove namirnice      
app.post ('/namirnice', (req, res) => {
    res.statusCode = 201;
    res.setHeader ('Location', '/namirnice/1234');
    res.send({});
});

// dohvat namirnice po nazivu  
app.get ('/namirnice/grocerie_name', (req, res) => {
    res.json(data.jedna_namirnica.data);
});




// dohvaćanje shopping lista  
app.get ('/shoppingListe', (req, res) =>  {
    res.json(data.shoppingListe);
});
app.get ('/shoppingListe/:id', (req, res) => {
    res.json(data.jedna_shoppingLista)
});

// unos nove shopping liste     
app.post ('/shoppingListe', (req, res) => {
    res.statusCode = 201;
    res.setHeader ('Location', '/shoppingListe/5874');
    res.send({});
});

// prikaz namirnica u shopping listi
app.get ('/sadrzajShoppingListe', (req, res) => {
    res.json(data.sadrzajShoppingListe.data.namirnice_lista);
});

// dohvat shopping liste po nazivu    
app.get ('/shoppingListe/list_name', (req, res) =>  {
    res.json(data.jedna_shoppingLista.data);
});


// prikaz namirnica u frizideru
app.get ('/sadrzajFrizidera', (req, res) => {
    res.json(data.sadrzajFrizidera.data.namirnice_lista);
});

//unos namjernica u frižider
app.post ('/sadrzajFrizidera', (req, res) => {
    res.statusCode = 201;
    res.setHeader ('Location', '/sadrzajFrizidera/12345');
    res.send({});
});

//unos namjernica u shopping listu
app.post ('/sadrzajShoppingListe', (req, res) => {
    res.statusCode = 201;
    res.setHeader ('Location', '/sadrzajShoppingListe/2356');
    res.send({});
});




app.listen(port, () => console.log(`Slušam na portu ${port}!`))