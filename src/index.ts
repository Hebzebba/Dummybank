import express from "express";
import { allStatements, singleStatement } from "./controllers/data_controller";
const cors = require("cors");
import { setDataToCache } from "./services/data_generate_service";

const app = express();
const port = 3000;
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

const init = () => {
  console.log("loading cache data..........");
  setDataToCache();
};

init();

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});
app.get("/statements", allStatements);

app.get("/statements/customer", singleStatement);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;