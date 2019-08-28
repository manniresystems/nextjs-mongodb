const url = require("url");
const MongoClient = require("mongodb").MongoClient;
let cachedDb = null;

async function connectToDatabase(uri) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true });
  const db = await client.db(url.parse(uri).pathname.substr(1));
  cachedDb = db;
  return db;
}
module.exports = async (req, res) => {
  const db = await connectToDatabase(
    "mongodb://admin:Admin13131@ds053312.mlab.com:53312/conms"
  );
  const collection = await db.collection("_country");
  const countries = await collection.find({}).toArray();
  res.status(200).json({ countries });
};
