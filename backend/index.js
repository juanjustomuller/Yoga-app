const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

//middleware
app.use(cors());
app.use(express.json());

//MongoDB Connection
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${dbUser}:${dbPassword}@yoga-app.wthm2.mongodb.net/?retryWrites=true&w=majority&appName=yoga-app`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
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
    const paymentCollections = database.collection("payments");
    const enrolledCollections = database.collection("enrolled");
    const applideCollections = database.collection("applide");

    //class routes
    app.post("/new-class", async (req, res) => {
      const newClass = req.body;
      const result = await classesCollections.insertOne(newClass);
      res.send(result);
    });

    app.get("/classes", async (req, res) => {
      const query = { status: "aprobado" };
      const result = await classesCollections.find().toArray();
      res.send(result);
    });

    //get classes by instructor email
    app.get("/classes/:email", async (req, res) => {
      const email = req.params.email;
      const query = { instructorEmail: email };
      const result = await classesCollections.find(query).toArray();
      res.send(result);
    });

    //manage classes (administrar clases)
    app.get("/classes-manage", async (req, res) => {
      const result = await classesCollections.find().toArray();
      res.send(result);
    });

    //update classes status and reason (con PATCH se actualiza informacion puntual y con put toda la informacion)
    app.patch("/change-status/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body.status;
      const reason = req.body.reason;
      const filter = { _id: new ObjectId(id) }; //Este filtro es como una regla que usamos para encontrar exactamente el elemento que queremos cambiar en la base de datos. Aquí usamos el id que obtuvimos antes y lo convertimos en un objeto ObjectId para que la base de datos lo entienda.
      const options = { upsert: true }; //Esta opción dice: "Si no encuentro un elemento con este id, crea uno nuevo"
      const updateDoc = {
        //"quiero actualizar los campos status y reason
        $set: {
          status: status,
          reason: reason,
        },
      };
      const result = await classesCollections.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    //get approved classes
    app.get('/approved-classes', async (req, res) => {
      const query = { status: "aprobado" };
      const result = await classesCollections.find(query).toArray();
      res.send(result);
    })

    //get a single class detail
    app.get('/class/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id)}
      const result = await classesCollections.findOne(query)
      res.send(result)
    })

    //update class detail (toda la info de la clase, con PUT)
    app.put('/updated-class/:id', async (req, res) => {
      const id =  req.params.id
      const updateClass = req.body
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updateClass.name,
          description: updateClass.description,
          price: updateClass.price,
          availableSeats: parseInt(updateClass.availableSeats),
          videoLink: updateClass.videoLink,
          status: 'Pendiente'
        }
      }
      const result = await classesCollections.updateOne(filter, updateDoc, options)
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    // Ensures that the client will close when you finish/error
    console.error("Failed to connect to MongoDB", error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World, Hello Developers!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
