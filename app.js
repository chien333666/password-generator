const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

// 設定模板引擎
app.engine('.hbs', engine({ extname: '.hbs' })) // .hbs 為後綴
app.set('view engine', '.hbs') // 指定模板引擎
app.set('views', './views') // 指定檔案位置
// 宣告靜態檔案位置
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/movies')
})

app.get('/movies', (req, res) => {
  res.render('index')
})

app.get('/movie/:id', (req, res) => {
  res.send(`showing movie ${req.params.id}`)
})


app.listen(port, () => {
  console.log(`1st express server on http://localhost:${port}`)
})
