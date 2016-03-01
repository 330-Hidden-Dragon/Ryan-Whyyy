var PouchDB = require('pouchdb')
  , pdbFind = require('pouchdb-find')

PouchDB.plugin(pdbFind)

var db = window.db

module.exports = db = new PouchDB('viva_voce')

db.on('error', function (err) {
  console.error(err)
})
