const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const cors = require('cors')
const urlRouter = require('./controllers/urlRouter')
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorHandler')
require('./models/autoincrement')
require('./ultils/database')
const corsOptions = {
  origin: 'https://drop-shortener.netlify.app',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use('/api/v1/quick-access', urlRouter)
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`server on ${PORT}`)
})
