import express from 'express';
import cors from 'cors';
import baza from './storage2';
import connect from './db.js';
import mongo from 'mongodb';



const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// čitanje korisnika po id-u
app.get('/users/:id', async (req, res) => {
    let id = req.params.id;        // URL parametar
    let db = await connect();

    let doc = await db.collection("users").findOne({_id: mongo.ObjectId(id)})
    res.json(doc)
})

// čitanje korisnika iz MongoDB-a
app.get('/users', async (req, res) => {
    let db = await connect() // pristup db objektu
    let cursor = await db.collection("users").find()
    let results = await cursor.toArray()
    res.json(results)
})

// čitanje namjernica iz MongoDB-a
app.get('/groceries', async (req, res) => {
    let db = await connect() // pristup db objektu
    let cursor = await db.collection("groceries").find()
    let results = await cursor.toArray()
    res.json(results)
})

/* čitanje stavki frižidera s MongoDB-a
app.get('/fridge', async (req, res) => {
    let db = await connect() // pristup db objektu
    let cursor = await db.collection("fridge").find()
    let results = await cursor.toArray()
    res.json(results)
})*/


// čitanje shopping listi s MongoDB-a
app.get('/shopping_lists', async (req, res) => {
    let db = await connect() // pristup db objektu
    let cursor = await db.collection("shopping_lists").find()
    let results = await cursor.toArray()
    res.json(results)
})

// trebati će za kategorije i naziv namjernice
app.get('/posts', async (req, res) => {
    let db = await connect()
    let query = req.query;
    let selekcija = {}

    if (query._any) { // za upit: /posts?_all=pojam1 pojam2
        let pretraga = query._any
        let terms = pretraga.split(' ')
        let atributi = ["username", "budzet"]
        selekcija = {
            $and: [],
        };
        terms.forEach((term) => {
            let or = {
                $or: []
            };
            atributi.forEach(atribut => {
                or.$or.push({ [atribut]: new RegExp(term) });
            })
            selekcija.$and.push(or);
        });
    }
    console.log("Selekcija", selekcija)
    let cursor = await db.collection("users").find(selekcija)
    let results = await cursor.toArray()
    res.json(results)
})

// čitanje namjernica iz MongoDB uz pretragu i filtriranje
app.get('/groceries', async (req, res) => {
    let query = req.query
    let filter = {}
    if (query.naziv_namjernice) {
        filter["naziv_namjernice"] = new RegExp(query.naziv_namjernice)
    }
    console.log("Filter za Mongo", filter)
    let db = await connect()
    let cursor = await db.collection("groceries").find(filter).sort({ kategorija: -1 })
    let results = await cursor.toArray()
    // Premještanje atributa _id u id
    results.forEach(e => {
        e.id = e._id
        delete e._id
    })
    res.json(results)
})




// Storage stari



//Frižider operacije 
app.get('/fridge', (req, res) => {
    let cards = baza.data1.fridge.fridge_namjernice
    let query = req.query

    if (query.title && query.Category) {

        cards = cards.filter(x => x.naziv_namjernice.indexOf(query.title) >= 0).filter(x => x.kategorija.indexOf(query.Category) >= 0)

    } else {

        cards = cards.filter(x => x.kategorija.indexOf(query.Category) >= 0)

    }

    res.json(cards)
})
//šoping lista operacije
app.get('/shoppinglist', (req, res) => {
    let query = req.query
    let lists = baza.data1.shopping_liste
    res.json(lists)
})
//odabir namjernice operacije
app.get('/choosegrocery', (req, res) => {
    let grocery = baza.data1.namjernice
    let query = req.query

    if (query.title) {
        grocery = grocery.filter(x => x.naziv_namjernice.indexOf(query.title) >= 0)
    }

    res.json(grocery)
})


/*app.get('/posts', (req, res) => {
    let posts = storage.posts
    let query = req.query
    
    if (query.title) {
        posts = posts.filter(e => e.title.indexOf(query.title) >= 0)
    }
    
    if (query.createdBy) {
        posts = posts.filter(e => e.createdBy.indexOf(query.createdBy) >= 0)
    }
    
    if (query._any) {
        let terms = query._any.split(" ")
        posts = posts.filter(doc => {
            let info = doc.title + " " + doc.createdBy
            return terms.every(term => info.indexOf(term) >= 0)
        })
    }

    res.json(posts)
})
*/


/* // dohvaćanje korisnika   
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
}); */


app.listen(port, () => console.log(`Slušam na portu ${port}!`))