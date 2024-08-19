const express = require('express')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 3000
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD


//MongoDB Connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${dbUser}:${dbPassword}@yoga-app.wthm2.mongodb.net/?retryWrites=true&w=majority&appName=yoga-app`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create DB and collection
    const database = client.db("yoga-app");
    const userCollections = database.collection("users");
    const classesCollections = database.collection("classes");
    const cartCollections = database.collection("cart");
    const paymentCollections =  database.collection("payments");
    const enrolledCollections = database.collection("enrolled");
    const appliedCollections = databae.collection("applide")

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World, Hello Developers!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})