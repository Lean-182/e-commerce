const { Router } = require("express");
const { Purchased, purchased_products } = require("../db");
const axios = require("axios");

const router = Router();

router.post("/", async (req, res, next) => {
  const { productsIds, userId, date } = req.body;
  try {
    const purchased = await Purchased.create({
      date: date,
      userId: userId
    });
    productsIds.forEach((item) => {
      let purchasedProducts = purchased_products.create({
        purchasedId: purchased.dataValues.id,
        productId: item,
      });
    });
    res.send("successful purchase")
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const purchased = await Purchased.findAll({
      where: {
        id: id,
      },
    });
    res.send(purchased)
  } catch (err) {
    next(err);
  }
});

module.exports = router;
