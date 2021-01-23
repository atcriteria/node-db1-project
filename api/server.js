const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    return db('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
});

server.get('/api/accounts/:id', (req, res) => {
    return db('accounts')
        .where("id", req.params.id)
        .then(account => {
            res.status(200).json(account)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
});

server.post('/api/accounts', (req, res) => {
    const newAccount = req.body;
    return db('accounts')
        .insert(newAccount)
        .then(account => {
            res.status(201).json({message: "Created"})
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
});

server.put('/api/accounts/:id', (req, res) => {
    const updatedAccount = req.body;
    return db('accounts')
        .where("id", req.params.id)
        .update(updatedAccount)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
});

server.delete('/api/accounts/:id', (req, res) => {
    return db('accounts')
        .where('id', req.params.id)
        .del()
        .then(good => {
            res.status(200).json({ message: "Deleted successfully"})
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
})

module.exports = server;
