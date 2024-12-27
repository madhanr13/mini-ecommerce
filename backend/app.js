const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const products = require("./routes/product");
const orders = require("./routes/order");
const connectDatabase = require("./config/connectDatabase");

//config
dotenv.config({
  path: path.join(__dirname, "config", "config.env"),
});

//database connection
connectDatabase();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/v1", products);
app.use("/api/v1", orders);

//port
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
