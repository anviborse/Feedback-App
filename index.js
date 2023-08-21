const express = require("express");
const cors = require("cors");
const {MongoClient, ObjectId} = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

async function connectToMongoDB() {
	const client = new MongoClient("mongodb://0.0.0.0:27017", { useUnifiedTopology: true });
	try {
		await client.connect();
		console.log("Connected to MongoDB");
		return client.db("feedback_system");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		throw error;
	}
}
app.post("/save", (req, res) => {
	const {name, email, feedback, rating} = req.body;
	let urladd = "mongodb://0.0.0.0:27017";
	MongoClient.connect(urladd, (err, database) => {
		if (err) {
			console.log(err);
		}else{
			const dbo = database.db("feedback_system");
			let doc = {"name":name, "email":email, "feedback":feedback,"rating":rating};
			dbo.collection("student").insertOne(doc, (err, result) => {
				if (err) {
					res.send(err);
				}else{
					res.send(result);
				}
			})
		}
	})
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (username === 'admin' && password === 'password') {
      res.send({ msg: 'Login successfull!' });
    } else {
      res.send( {err : 'Invalid credentials!!!'});
    }
  });
  
  app.get("/api/student", async (req, res) => {
	const db = await connectToMongoDB();
	try {
	  const student = await db.collection("student").find().toArray();
	  res.json(student);
	} catch (error) {
	  res.send({ message: "Error fetching data from MongoDB" });
	}
  });
  
  
  app.delete("/api/student/:id", async (req, res) => {
	const db = await connectToMongoDB();
	try {
	  const id = req.params.id;
	  await db.collection("student").deleteOne({ _id: ObjectId(id) });
	  res({ message: "Student feedback deleted successfully" });
	} catch (error) {
	  res.send({ message: "Error deleting student feedback" });
	}
  });
  



app.listen(9000,() => {console.log("ready @ 9000")})


