const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const User = require("./model/User");
const app = express();

mongoose.connect(
  "mongodb+srv://antony07:Antony123@cluster0.yag4dvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => console.log("MongoDB Connected"))
.catch((error) => console.log(error));

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/products", async (req, res) => {

  try {

    const response = await axios.get(
      "https://fakestoreapi.com/products"
    );

    res.json(response.data);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch products",
    });

  }

});

app.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully",
    });

  } catch (error) {

  console.log(error);

  res.status(500).json({
    message: "Server Error",
  });



  }

});
app.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});