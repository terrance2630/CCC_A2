
const nano = require('nano')

// load in environment for couchdb
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

// connect to couchdb
const USER = process.env.COUCHDB_USER;
const PASS = process.env.COUCHDB_PASS;
const URL = process.env.COUCHDB_URL;
const PORT = process.env.COUCHDB_PORT;
const TWITTER_GEO = "twitter-geo"

const twitterDB = nano(`http://${USER}:${PASS}@${URL}:${PORT}/${TWITTER_GEO}`)


module.exports = {
    twitterDB
};