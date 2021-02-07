const dotEnv  = require('dotenv')
dotEnv.config()

const options = {
  port: process.env.PORT
}

module.exports = options