import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import path from 'path';

const __dirname = path.resolve();
const app = express();
const port = 5000;
const mongoURI = 'mongodb+srv://22071a66d2:anish@cluster0.fieywao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace 'bookstore' with your database name

// CORS configuration
app.use(cors());

app.use(express.json());
app.use("/books", booksRoute);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "dist", "index.html"))
);

async function connectToMongoDB() {
  try {
    console.log(`MongoDB URI: ${mongoURI}`);
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB using Mongoose");
    app.listen(port, () => {
      console.log(`App is listening on port: ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();
