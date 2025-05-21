const { MongoClient } = require('mongodb');
// const uri = 'mongodb://root:rootpw@localhost:27017';
const uri="mongodb+srv://juanderodriguez:Blu742cBz7rWWUd3@db.swjciap.mongodb.net/"
const client = new MongoClient(uri);
let db;

async function conectarDB() {
  if (!db) {
    await client.connect();
    db = client.db('CumpliSecure');
    console.log("✅ Base de datos conectada");
  }
  return db;
}

module.exports = conectarDB;
