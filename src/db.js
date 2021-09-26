import mongo from "mongodb"

let connection_string = "mongodb+srv://admin:admin@cluster0.w5mjk.mongodb.net/Fridge_Manager_database?retryWrites=true&w=majority";

let client = new mongo.MongoClient(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = null

/*client.connect(err => {
    if (err) {
    console.error(err);
    return;
    }
    console.log("Database connected successfully!");
    
    // za sada ništa nećemo raditi, samo zatvaramo pristup sljedećom naredbom
    client.close();
   });*/

export default () => {
    return new Promise((resolve, reject) => {
        
        if (db && client.isConnected()) {
            resolve(db)
        }

        client.connect(err => {
            if (err) {
                reject("Doslo je do greske prilikom spajanja: " + err)
            }
            else {
                console.log("Uspjesno spajanje na bazu")
                db = client.db("Fridge_Manager_database")
                resolve(db)
            }
        })
    })
}