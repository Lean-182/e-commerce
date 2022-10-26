const { Router } = require("express");
const { Product, Category, Stock } = require("../db");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const getApiProducts = require("./getApiProducts");
const e = require("express");

const router = Router();

///HARCODEADOOOOOOOOOOOOOOOO
const size = ["S", "M", "L"];
const stock = [0, 5, 10, 20, 30, 40, 50];
/////////////////////////////////////////////

router.delete("/:id", async (req, res, next) => {
  console.log("Entra");
  const { id } = req.params;
  try {
    const exProduct = await Product.destroy({ where: { id: id } });
    res.send(`${exProduct} product has been deleted`);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { name, price, image, brand, gender, nameCategory, description } =
    req.body;
  let id = uuidv4();
  try {
    var createCategory = await Category.findOrCreate({
      where: {
        name: nameCategory,
        gender: gender,
      },
    });
    let NewIdCategory = createCategory[0].dataValues.id;

    const product = await Product.findOrCreate({
      where: {
        id,
        name,
        price,
        image,
        brand,
        gender,
        categoryId: NewIdCategory,
        description,
      },
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  const { name, category, id } = req.query;
  let ProductosTotales = await Product.findAll({
    include: {
      model: Stock,
    },
  });
  if (ProductosTotales.length === 0) {
    await getApiProducts();
    ProductosTotales = await Product.findAll({
      include: {
        model: Stock,
      },
    });
  }
  try {
    if (name) {
      let filteredProducts = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: {
          model: Stock,
        },
      });
      res.send(filteredProducts);
    } else if (category) {
      let filteredProducts = await Product.findAll({
        where: {
          categoryId: category,
        },
        include: {
          model: Stock,
        },
      });
      res.send(filteredProducts);
    }
    else if (id) {
      let filteredProducts = await Product.findAll({
        where: {
          id: id,
        },
        include: {
          model: Stock,
        },
      });
      res.send(filteredProducts);
    }
    else {
      res.send(ProductosTotales);
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { type } = req.query;
  const { id } = req.params;
  const { name, price, image, brand, gender, categoryId, description } =
    req.body;
  console.log(id, type, name, price, image)
  const product = await Product.findOne({ where: { id: id } });
  try {
    switch (type) {
      case "name":
        product.name = name;
        await product.save();
        res.send(`name changed successfully`);
        break;
      case "price":
        product.price = price;
        await product.save();
        res.send(`price changed successfully`);
        break;
      case "image":
        product.image = image;
        await product.save();
        res.send(`image changed successfully`);
        break;
      case "brand":
        product.brand = brand;
        await product.save();
        res.send(`brand changed successfully`);
        break;
      case "gender":
        product.gender = gender;
        await product.save();
        res.send(`gender changed successfully`);
        break;
      case "categoryId":
        product.categoryId = categoryId;
        await product.save();
        res.send(`categoryId changed successfully`);
        break;
      case "description":
        product.description = description;
        await product.save();
        res.send(`description changed successfully`);
        break;
      default:
        break;
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
