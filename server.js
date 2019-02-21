'use strict';

//Requires:
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors("*"));

app.use(express.json({ extended: false }));

app.use(express.static(__dirname + '/dist', {
    extensions: ['html']
}));

app.get("/toto" ,()=> {
    res.send("TOTO");
});


app.listen(2000);