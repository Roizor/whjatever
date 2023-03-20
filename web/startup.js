const express = require('express')
const a = express()

a.get('/jklsdfgjkldjklsdfgjkergkljergergergiopuqwertuiop23iou345fgxcv', (req, res) => {
  process.exit(0)
})

a.get('/*', (req, res) => {
  res.sendStatus(404)
})

a.listen(8900)
