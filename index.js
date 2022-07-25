const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/validate-xx', (req, res) => {

  const {price, phone} = req.body

  // YOUR BUSINESS LOGIC HERE

  // RESPONSE
  // res.status(200).json({text: 'Payment succeeded', type: 'success'})
  res.status(500).json({text: 'Payment failed', type: 'error'})
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})