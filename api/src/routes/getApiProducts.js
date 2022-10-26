const axios = require("axios");
const { Product, Category, Stock } = require("../db");
const { v4: uuidv4 } = require("uuid");
require('dotenv').config();

const {API_KEY, URL_API} = process.env;
module.exports = async () => {
   const IDs = [8799, 3630, 9263, 4169, 2641, 4208, 7078, 3602, 5668, 14274];
   const size = ["S", "M", "L"];
   const stock = [0, 5, 10, 20, 30, 40, 50];
   let products = [];
   for (let index = 0; index < IDs.length; index++) {
      let api = (
         await axios.get(
            URL_API+`/list?limit=48&store=US&offset=0&categoryId=${IDs[index]}&rapidapi-key=${API_KEY}`
         )
      ).data;
      let categoryGenero = index < 5 ? "Women" : "Men";
      var createCategory = await Category.findOrCreate({
         where: {
            name: api.categoryName,
            gender: categoryGenero,
         },
      });
      let NewIdCategory=createCategory[0].dataValues.id

      const tempArr = api.products.map((item) => {
         let tempObj = {
            ...item,
            categoryId:NewIdCategory,
         };
         return tempObj;
      });
      products.push(tempArr);
   }

   for (let index1 = 0; index1 < products.length; index1++) {
      let producsNew = products[index1];
      let genero = index1 < 5 ? "Women" : "Men";
      let ProductosPorCategoria = [];
      for (let index = 0; index < producsNew.length; index++) {
         let id = uuidv4();
         var createProduct = await Product.findOrCreate({
            where: {
               id: id,
               name: producsNew[index].name,
               price: producsNew[index].price.current.value,
               brand: producsNew[index].brandName,
               image: `https://${producsNew[index].imageUrl}`,
               gender: genero,
               categoryId: producsNew[index].categoryId,
               description: `${producsNew[index].name} is very good quality clothing, made by the ${producsNew[index].brandName} brand in the USA with the best quality materials. We have different sizes and colors of this product so you can choose the one you like best.`,
            },
         });
         size.forEach((item) => {
            Stock.create({
               productSize: item,
               stock: stock[Math.floor(Math.random() * 7)],
               productId: id,
            });
         });
         ProductosPorCategoria.push(createProduct);
      }
   }
};
