import express from 'express'
import bodyParser from 'body-parser'
import route from './server/routes'
import logger from 'morgan'

const app = express()
app.use(logger('dev'))

const options = {
  contentBase: './dist',
  hot: true,
  host: 'localhost',
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', route)
const port = process.env.PORT || 8000

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to  my Population Management APP' })
})

app.get('*', (req, res) => {
  res
    .status(404)
    .send({ message: 'This is an unvailable route. Visit / to see all routes' })
})

app.listen(port, () => {
  console.log(`App is running on  http://localhost:${port}`)
})

export default app
