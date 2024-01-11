const express = require("express");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "*", // Allow all origins (for testing purposes)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

const delay = () => new Promise((res) => setTimeout(res, 2000));

app.get("/products", async (req, res) => {
  await delay();
  res.json([
    {
      id: "1",
      name: "Shampoo",
      icon: "💆",
      cost: 150,
    },
    {
      id: "2",
      name: "Vegetable",
      icon: "🥗",
      cost: 190,
    },
    {
      id: "3",
      name: "Cereal",
      icon: "🥣",
      cost: 300,
    },
    {
      id: "4",
      name: "Milk",
      icon: "🥛",
      cost: 600,
    },
    {
      id: "5",
      name: "Eggs",
      icon: "🍳",
      cost: 340,
    },
    {
      id: "6",
      name: "Fruit",
      icon: "🍇",
      cost: 200,
    },
    {
      id: "7",
      name: "Ring",
      icon: "💍",
      cost: 800,
    },
    {
      id: "8",
      name: "Sunglasses",
      icon: "🕶️",
      cost: 50,
    },
    {
      id: "9",
      name: "Red Apple",
      icon: "🍎",
      cost: 999,
    },
  ]);
});

app.listen(8080, () => console.log("Listening on 8080"));

