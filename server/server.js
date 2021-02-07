const express = require('express')
const path = require('path')
const cors = require('cors')
const config = require('./config')
const bodyParser = require('body-parser')
const server = express()
const taskRoutes = require('./routes/task.routes')



const port = config.port || 9000



const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../build')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true })
]

middleware.forEach((it) => server.use(it))
server.use('/api/v1/tasks', taskRoutes)

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})


server.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, '../../build/index.html'))
})

server.listen(port)

console.log(`Serving at http://localhost:${port}`)