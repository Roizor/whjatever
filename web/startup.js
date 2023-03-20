const express = require('express')
const a = express()

a.get('/*', (req, res) => {
  res.sendStatus(200)
})

a.listen(8900)
