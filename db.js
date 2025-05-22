const { MongoClient } = require('mongodb');
const uri = 'https://cumplisecure-db.onrender.com';
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
