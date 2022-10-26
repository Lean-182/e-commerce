const { Router } = require("express");
const { Product, Category } = require("../db");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let allCategory = await Category.findAll();
    res.status(200).json(allCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
