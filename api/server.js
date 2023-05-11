const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const bookRoute = require("./routes/books");
const userRoute = require("./routes/users");
const { db } = require("./models/Book");

// Use environment variable for port if it exists, otherwise use default port 8800
const port = process.env.PORT || 8800;

dotenv.config();

// Allow CORS requests from any origin
app.use(
  cors({
    origin: "*",
  })
);

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connection Successfull"))
  .catch((err) => console.log(err));

// Parse incoming JSON request bodies
app.use(express.json());

// Route incoming requests to the appropriate controller
app.use("/api/books", bookRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log(`Backend server is running in ${port}!`);
});
