var PouchDB = require('pouchdb')
  , pdbFind = require('pouchdb-find')

PouchDB.plugin(pdbFind)

window.PouchDB = PouchDB

var db = window.db

module.exports = db = new PouchDB('viva_voce')

db.on('error', function (err) {
  console.error(err)
})
