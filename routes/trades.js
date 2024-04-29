const express = require('express');
const router = express.Router();
const Trade = require("../models/trades");

router.post("/", async (req, res) => {
  const reqBody = req.body;

  const tradeData = {
    type: reqBody.type,
    user_id: reqBody.user_id,
    symbol: reqBody.symbol,
    shares: reqBody.shares,
    price: reqBody.price,
    timestamp: reqBody.timestamp,
  };

  try {
    const trade = await Trade.create(tradeData);

    res.status(201).json(trade);
  } catch (error) {
    res.send("Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const allTrades = await Trade.findAll({
      order: [["id", "ASC"]]
    });

    res.json(allTrades);
  } catch (error) {
    res.send("Error");
  }
});

router.get("/:id", async (req, res) => {
  const requestedID = req.params.id;

  try {
    const trade = await Trade.findOne({
      where: {
        id: requestedID,
      }
    });

    if (!trade) {
      return res.send("ID not found");
    }

    return res.json(trade);
  } catch (error) {
    res.send("Error");
  }
});


module.exports = router;
