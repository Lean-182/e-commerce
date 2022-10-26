const { Router } = require("express");
const { Stock ,Product} = require("../db");

const router = Router();

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const stock = await Stock.findAll({ where: { productId: id } });
    res.send(stock);
  } catch (error) {
    next(error);
  }
});

router.put("/drop", async (req, res, next) => {
  console.log("Entraaa")
  const { stockProducts } = req.body;
  console.log(req.body, "soy stockProducts")
  const productsChanged = []
  try {
    for (let i = 0; i < stockProducts?.length; i++) {
      const productStock = await Stock.findOne({
        where: { productId: stockProducts[i].id, productSize: stockProducts[i].size },
      });
      if (productStock.stock > 0) {
        productStock.stock = await productStock.stock - Number(stockProducts[i].stock);
        console.log(productStock.stock)
      }
      await productStock.save();
      productsChanged.push(productStock)
    }
    // stockProducts.forEach(async (item) => {
    //   const productStock = await Stock.findOne({
    //     where: { productId: item.id, productSize: item.size },
    //   });
    //   productStock.stock = await productStock.stock - Number(item.stock);
    //   await productStock.save();
    //   productsChanged.push(productStock)
    // });
    res.send(productsChanged);
  } catch (err) {
    next(err);
  }
});

router.put('/add', async (req, res, next) => {
  const { stockProducts } = req.body;
  const productsChanged = []
  try {
    for (let i = 0; i < stockProducts.length; i++) {
      const productStock = await Stock.findOne({
        where: { productId: stockProducts[i].id, productSize: stockProducts[i].size },
      });
      productStock.stock = await productStock.stock + Number(stockProducts[i].stock);
      await productStock.save();
      productsChanged.push(productStock)
    }
    // stockProducts.forEach(async (item) => {
    //   const productStock = await Stock.findOne({
    //     where: { productId: item.id, productSize: item.size },
    //   });
    //   productStock.stock = await productStock.stock - Number(item.stock);
    //   await productStock.save();
    //   productsChanged.push(productStock)
    // });
    res.send(productsChanged);
  } catch (err) {
    next(err);
  }
})
router.put("/AddStocks", async (req, res, next) => {
  const { idProduct, Sizes } = req.body;
  console.log("ACAAAAAAA ", idProduct, "  ", Sizes)
  try {
    const stock = await Stock.findAll({ where: { productId: idProduct } });

    var FraseRespuesta = "No found Product"

    console.log(idProduct, "  ", Sizes)

    for (const property in Sizes) {
      let size = property;
      let amount = Sizes[property];
      console.log("ACAAAAAA DATOS ",size,"  ",amount,"  ",stock)
      FraseRespuesta = "No found Stock"

      if (stock !== undefined && stock.length !== 0)
        for (let index = 0; index < stock.length; index++) {
          const stockData = stock[index];
          if (stockData.productSize == size) {
            FraseRespuesta = `Product "${stockData.name}" (Size ${size}) modified a Stock ${amount}`
            stock[index].stock = parseInt(amount)
            await stock[index].save()
            break;
          }
        }
      if (FraseRespuesta == "No found Stock") {
        Stock.create({
          productSize: size,
          stock: amount,
          productId: idProduct,
        });
        FraseRespuesta = `Product (Size ${size}) created with Stock ${amount}`
      }
    }

    console.log("ACA  ", FraseRespuesta);
    res.status(202).send(FraseRespuesta);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
