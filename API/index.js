
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const {initDB} = require('./database/database')

const app = express();
app.use(bodyParser.json())
const PORT = 2727;

app.use(require('./server/User_inventory/User_inventory'));
app.use(require('./server/General_items/General_items'));
app.use(require('./server/Specific_items/Specific_items'));


initDB();

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`)
});

