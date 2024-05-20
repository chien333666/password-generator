const express = require('express')
const app = express()
const port = 3000

// 宣告靜態檔案位置
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/movies')
})

app.get('/movies', (req, res) => {
  res.send('listing movies')
})

app.get('/movie/:id', (req, res) => {
  res.send(`showing movie ${req.params.id}`)
})


app.listen(port, () => {
  console.log(`1st express server on http://localhost:${port}`)
})
