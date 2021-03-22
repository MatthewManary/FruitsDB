const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Creat a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect((err) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function() {
    client.close();
    });
});

const insertDocuments = (db, callback) => {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Insert some documents
    collection.insertMany([
        {
            name : "Apple",
            score: 8,
            review: "Great fruit"
        },
        {
            name: "Orange",
            score: 6,
            review: "Kinda sour"
        },
        {
            name: "Banana",
            score: 9,
            review: "Great suff!"
        }
    ], (err, result) => {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal("Inserted 3 documents into the collection");
        callback(result);
    });
}