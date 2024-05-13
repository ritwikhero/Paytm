const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");

app.use(cors());
app.use("/api/v1",mainRouter);
app.use(express.json());

const app = express();



app.listen(3000);