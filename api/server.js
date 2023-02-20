const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bookRoute = require("./routes/books");

const port = process.env.PORT || 8800;

dotenv.config();

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

app.use(express.json());

app.use("/api/books", bookRoute);

app.listen(port, () => {
  console.log(`Backend server is running in ${port}!`);
});
