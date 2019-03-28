require('dotenv').config()

const development = {
  url: process.env.DEV_DATABASE_URL,
}
const test = {
  url: process.env.TEST_DATABASE_URL,
}

let dbUrl
if (process.env.NODE_ENV === 'test') {
  dbUrl = test.url
} else {
  dbUrl = development.url
}

export default dbUrl
