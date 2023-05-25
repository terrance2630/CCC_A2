// import models for couchdb
const couchdb = require('../models');

// *************************************************************************************** //
//                              Define the Controllers                                    //
// *************************************************************************************** //

// Get all database for couchdb
const getAll = async (req, res) => {
    try {
        const all = await couchdb.all();
        res.status(200).json(all);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get twitter data
const getTwitter = async (req, res) => {
    try {
        const twitter = await couchdb.db.use('twitter');
        const twitterData = await twitter.list({ include_docs: true });
        res.status(200).json(twitterData);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get mastodon data
const getMastodon = async (req, res) => {
    try {
        const mastodon = await couchdb.db.use('mastodon');
        const mastodonData = await mastodon.list({ include_docs: true });
        res.status(200).json(mastodonData);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// *************************************************************************************** //

module.exports = {
    getAll,
    getTwitter,
    getMastodon
}
