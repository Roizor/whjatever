const express = require('express');
const app = express();

app.get('/', async (req, res) => {
    return res.send('Hello')
})

app.listen(8999, () => {
    console.log('Web server should be running')
})