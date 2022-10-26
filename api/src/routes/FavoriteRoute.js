const { Router } = require("express");
const { User, Product, favorites } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { userId, productId } = req.body;


  console.log(userId,"  ",productId)
  try {
    const favoriteProduct = await favorites.create({
      productId: productId,
      userId: userId,
    });
    res.send(`a product has been added as a favorite. User id: ${userId}`);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log("Soy id ",id)
  let productsFavorites = [];
  try {
    const favoritesProducts = await favorites.findAll({
      where: { userId: id },
    });
    const filterFavs = favoritesProducts.map(fav => fav.productId);

    for(let i = 0; i < filterFavs.length; i++) {
      await Product.findByPk(filterFavs[i])
      .then((res)=> productsFavorites.push(res))
    };

    console.log("SOY PRODUCTS FAVORITES", productsFavorites)
    
    res.send(productsFavorites);
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  const { userId, productId } = req.body;
  try {
    await favorites.destroy({
      where: { productId: productId, userId: userId },
    });
    res.send(`The product with the id ${productId} has been removed from the favorites list. User id: ${userId}`)
  } catch (err) {
    next(err);
  }
});

module.exports = router;
