const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

// application/x-www-form-urlencoded 분석해서 가져올 수 있게
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

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

app.get("/api/hello", (req, res) => {
   res.send("됨~~~~~!!!!!!!");
});

app.post("/api/users/register", async (req, res) => {
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

app.post("/api/users/login", (req, res) => {
   User.findOne({ email: req.body.email })
      .then((docs) => {
         if (!docs) {
            return res.json({
               loginSuccess: false,
               message: "제공된 이메일에 해당하는 유저가 없습니다.",
            });
         }
         docs.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
               return res.json({
                  loginSuccess: false,
                  message: "비밀번호가 틀렸습니다.",
               });
            docs.generateToken((err, user) => {
               if (err) return res.status(400).send(err);
               res.cookie("X_auth", user.token)
                  .status(200)
                  .json({ loginSuccess: true, userId: user._id });
            });
         });
      })
      .catch((err) => {
         return res.status(400).send(err);
      });
});

app.get("/api/users/auth", auth, (req, res) => {
   res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image,
   });
});

app.get("/api/users/logout", auth, (req, res) => {
   User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
      .then((user) => {
         return res.status(200).send({
            success: true,
         });
      })
      .catch((err) => {
         return res.json({ success: false, err });
      });
});

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
