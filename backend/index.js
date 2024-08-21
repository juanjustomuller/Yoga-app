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

    //----------------------------------CLASSES ROUTES --------------------------------------------------

    //crear clase
    app.post("/new-class", async (req, res) => {
      const newClass = req.body;
      const result = await classesCollections.insertOne(newClass);
      res.send(result);
    });

    //get all classes
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


    //------------------------------------------CART ROUTES------------------------------------------------------

    //create a cart item
    app.post('/add-to-cart', async (req, res) => {
      const newCartItem = req.body;
      const result = await cartCollections.insertOne(newCartItem)
      res.send(result)
    })

    //get cart item by ID
    app.get('/cart-item/:id', async (req, res) => {
      const id = req.params.id;
      const email = req.body.email;
      const query = {
        classId: id,
        userMail: email
      };
      const projection = { classId: 1}; //le dice a la BD q campos especificos queres que te devuelva, en este caso me dara solo el campo classId
      const result = await cartCollections.findOne(query, {projection: projection});
      res.send(result)
    })

    //get cart info by user email
    app.get('/cart/:email', async (req, res) => {
      const email = req.params.email
      const query = {userMail: email}
      const projection = {classId: 1}
      const carts = await cartCollections.find(query, {projection: projection});
      const classIds = carts.map((cart) => new ObjectId(cart.classId))
      const query2 = {_id: {$in: classIds}}
      const result = await classesCollections.find(query2).toArray()
      res.send(result)
    })

    //------------------------------------------ ENROLAMENT ROUTES (RUTAS DE INSCRIPCION)---------------------------

    //get classes list
    app.get('/popular_classes', async (req, res) => {
      const result = await classesCollections.find().sort({totalEnrolled: -1}).limit(6).toArray()
      //totalEnrolled es un campo en cada clase que indica cuántas personas se han inscrito en ella.
      //-1 significa que las clases se ordenan de mayor a menor, es decir, de la más popular a la menos popular.
      //.limit(6) significa que solo se devolverán las 6 clases más populares.
      res.send(result)
    })

    //get popular instructors

    /*PIPELINE: Te permite procesar datos en varias etapas, donde cada etapa realiza una operación específica, 
    y el resultado de una etapa se convierte en la entrada de la siguiente.*/
    app.get('/popular_instructors', async (req, res) => {
      const pipeline = [
        {
          $group: {
            _id: "$instructorEmail",  //Agrupa las clases por el correo electrónico del instructor
            totalEnrolled: {$sum: "$totalEnrolled"}  //suma el número total de estudiantes inscritos
          }
        },
        {
          $lookup: {   //búsqueda(lookup) en otra colección llamada users, 
            from: "users",    //para encontrar el documento del instructor correspondiente a cada correo electrónico
            localField: "_id",
            foreignField: "email",
            as: "instructor"   //Añade un campo llamado instructor que contiene la información del usuario (el instructor) cuyo correo electrónico coincide con _id.
          }
        },
        {
          $project: {   //Selecciona (proyecta) solo algunos campos del resultado anterior
            _id: 0,     //Elimina _id (lo pone en 0, lo que significa que no se mostrará).
            instructor: {
              $arrayElemAt: ["instructor", 0]
            },
            totalEnrolled: 1    //Para cada instructor, tendrás solo su información básica (el primer elemento en el array instructor) 
          }                     //y el total de estudiantes inscritos.
        },
        {
          $sort: {  //Ordena los instructores por totalEnrolled en orden descendente (de mayor a menor).
            totalEnrolled: -1   //Los instructores con más estudiantes inscritos aparecerán primero.
          }
        },
        {
          $limit: 6   //Limita el resultado a 6 instructores. Solo verás los 6 instructores más populares.
        }
      ];

      const result = await classesCollections.aggregate(pipeline).toArray()
      res.send(result)
    })

    //admin status
    app.get('admin-status', async (req, res) => {
      const approvedClasses = ((await classesCollections.find({status: "aprobado"})).toArray()).length; // tendrá un número que indica la cantidad de clases aprobadas
      const pendingClasses =  ((await classesCollections.find({status: "Pendiente"})).toArray()).length; //contendrá la cantidad de clases pendientes de aprobación.
      const instructors =  ((await userCollections.find({role: "instructor"})).toArray()).length; //endrá la cantidad total de instructores registrados
      const totalClasses =  (await classesCollections.find().toArray()).length; //contendrá el número total de clases
      const totalEnrolled = (await enrolledCollections.find().toArray()).length; //tendrá el número total de inscripciones de estudiantes.

      const result = {
        approvedClasses,
        pendingClasses,
        instructors,
        totalClasses,
        totalEnrolled
      }

      res.send(result)

    })









    //delete cart item
    app.delete('/delete-cart-item/:id', async (req, res) => {
      const id = req.params.id
      const query = { classId: id}
      const result = await cartCollections.deleteOne(query)
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
