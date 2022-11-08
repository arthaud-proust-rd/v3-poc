const express = require('express')
const VCubManager = require('./src/vcub/manager')
require('dotenv').config()

const app = express()
const port = 3000

const manager = new VCubManager();

app.get('/rent/in_progress', async (req, res) => {
    res.send(await manager.getRentInProgress());
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})