const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const config = require("./config/key");
const { User } = require("./models/User");

// application/x-www-form-urlencoded 분석해서 가져올 수 있게
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
   .connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log("MongoDB Connected..."))
   .catch((err) => console.log(err));

app.get("/", (req, res) => {
   res.send("sksksksk ffff");
});

app.post("/register", async (req, res) => {
   // 회원 가입 할때 필요한 정보들을  client에서 가져오면
   // 그것들을 데이터 베이스에 넣어준다.

   const user = new User(req.body);

   const result = await user
      .save()
      .then(() => {
         res.status(200).json({
            success: true,
         });
      })
      .catch((err) => {
         res.json({ success: false, err });
      });
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
