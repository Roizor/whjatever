const express = require('express')
const a = express()

a.get('/*', (req, res) => {
  res.sendStatus(404)
})

a.listen(8900)
