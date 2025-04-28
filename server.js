const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");

// Serve the public folder statically

const JWT_SECRET = "yashx9901";
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

const user = [];

app.use(express.json());

function auth(req, res, next) {
  const token = req.headers.token;
  const decodedInfo = jwt.verify(token, JWT_SECRET);

  const username = decodedInfo.username;

  if (username) {
    req.username = username;
    next();
  } else {
    res.json({
      message: "User not logged in.",
    });
  }
}

app.use(express.static(path.join(__dirname, "public")));

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  let existingUser = "";

  // Check to make sure we don't have duplicate usernames.

  for (let i = 0; i < user.length; i++) {
    if (user[i].username == username) {
      existingUser = user[i];
    }
  }
  if (existingUser) {
    res.json({
      message: "Username already taken.",
    });
  } else {
    user.push({
      username: username,
      password: password,
    });
    res.json({
      message: "Sign up successfull",
    });
    console.log(user);
  }
});

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  let foundUser = "";
  const token = jwt.sign(
    {
      username: username,
    },
    JWT_SECRET
  );

  for (let i = 0; i < user.length; i++) {
    if (user[i].username === username && user[i].password === password) {
      foundUser = user[i];
      break;
    }
  }
  if (foundUser) {
    res.json({
      message: "Sign In Successfull",
      Token: token,
    });
    console.log(foundUser);
  } else {
    res.json({
      message: "Invalid Credentials",
    });
  }
});

app.post("/me", auth, function (req, res) {
  let foundUser = "";

  for (let i = 0; i < user.length; i++) {
    if (user[i].username === req.username) {
      foundUser = user[i];
      break;
    }
  }

  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.json({
      message: "Token invalid",
    });
  }
});

app.listen(4000, () => {
  console.log('Server is running on "http://localhost:4000/"');
});
