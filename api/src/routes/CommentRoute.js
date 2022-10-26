const { Router } = require("express");
const { Comment } = require("../db");
const { Product } = require("../db");
// const { Order } = require("../db");
const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const allComments = await Comment.findAll();
    allComments.length
      ? res.status(200).json(allComments)
      : res.status(404).send("no hay comentarios");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { productId, comment, rating, name ,userId} = req.body;
    console.log({ productId, comment, rating, name,userId })
    let newComment = await Comment.create({
      productId,
      comment,
      rating,
      name,
      userId,
    });
    let productComments = await Product.findByPk(productId);
    await productComments.addComment(newComment);
    res.status(200).send(newComment);
  } catch (error) {
    next(error);
  }
});

// router.put('/', async (req, res) => {
//     try {
//         const { orderID, allStocks } = req.body
//         console.log(orderID, allStocks)

//         if(orderID) {
//             console.log('aca')
//             let reviewID = await Order.update(
//             {
//                 stocks: allStocks,
//             },
//             {
//                 where: { id: orderID },
//             }
//         )
//             console.log("entroo",reviewID)
//         }else{
//             return res.status(400).json({error: "manda un id fracasado"})
//         }

//          res.status(200).json({message: "todo bien"})

//     } catch (error) {
//         res.status(404).send('No se pudo cambiar')
//     }
// });
module.exports = router;
