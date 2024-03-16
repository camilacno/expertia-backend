import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const url = process.env.MONGO_DB_CONNECTION_STRING
const dbNoSql = process.env.MONGO_DB_NAME

if (!url || !dbNoSql) {
  console.error(
    'Please set the MONGO_DB_CONNECTION_STRING and MONGO_DB_NAME environment variables'
  )
  process.exit(1)
}

let client
let clientPromise = MongoClient.connect(url, { useUnifiedTopology: true })
  .then((connectedClient) => {
    client = connectedClient
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
  })

const getCollection = async (collectionName) => {
  await clientPromise
  const db = client.db(dbNoSql)
  return db.collection(collectionName)
}

export default {
  linkCollection: () => getCollection('links'),
  optionCollection: () => getCollection('options'),
  feedbackCollection: () => getCollection('feedbacks'),
  questionCollection: () => getCollection('questions'),
}
