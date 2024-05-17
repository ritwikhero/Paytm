const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");
const app = express();

app.use(cors());
app.use("/api/v1",mainRouter);
// app.use("/api/v1/account/*",mainRouter);
app.use(express.json());




app.listen(3000);