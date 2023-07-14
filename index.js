const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
   .connect(
      "mongodb+srv://homanok8:tmdgus9471@boilerplate.bu7qejg.mongodb.net/",
      {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      }
   )
   .then(() => console.log("MongoDB Connected..."))
   .catch((err) => console.log(err));

app.get("/", (req, res) => {
   res.send("sksksksk");
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
