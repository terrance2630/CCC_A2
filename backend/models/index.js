// load in environment for couchdb
const USER = process.env.COUCHDB_USER;
const PASS = process.env.COUCHDB_PASS;
const URL = process.env.COUCHDB_URL;
const PORT = process.env.COUCHDB_PORT;

// connect to couchdb
const nano = require('nano')(`http://${USER}:${PASS}@${URL}:${PORT}/`)

// ping couchdb to check connection
console.log(`Connecting to CouchDB at ${URL} ... `)
nano.db.list().then((body) => {
    console.log('Connected to CouchDB! Avialable databases:')
    console.log(body)
}).catch((err) => {
    console.log('Error connecting to CouchDB')
    console.log(err)
});

module.exports = {
    
};