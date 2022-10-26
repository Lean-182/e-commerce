const e = require("express");
const { Router } = require("express");
const { DataTypes, where } = require("sequelize");
const { Order } = require("../db");
const { User } = require("../db");
const orderRouter = Router();
//email
const transporter = require("../../config/mailer");
const { changeStateOrder, createOrder, changeStateOrderDispatched } = require("../Email/mail.config");

require("dotenv").config();

orderRouter.get("/", async (req, res, next) => {
   const { type, parameter } = req.query;
   try {
      var allOrders = [];

      if (type !== "UserID" && type !== "OrderID")
         allOrders = await Order.findAll();
      else if (type === "UserID") {
         allOrders = await Order.findAll({
            where: {
               userId: parameter,
            },
         });
      } else {
         allOrders = await Order.findAll({
            where: {
               id: parameter,
            },
         });
      } 
      res.status(200).json(allOrders)
   } catch (error) {
      next(error);
   }
});

orderRouter.post("/", async (req, res) => {
   // email para orden creada osea se compro
   const { userId, stocks, estado ,contactAdress} = req.body;

   //console.log("ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",userId,"  ",stocks,"  ",estado)
   try {
      console.log("Entra")   
      var priceTotal = 0;
      for (let index = 0; index < stocks.length; index++) {
         const element = stocks[index];
         priceTotal += element.amount * element.value;
         stocks[index] = { ...stocks[index], comment: false };
      }
      priceTotal = priceTotal.toFixed(2);

      let stocksJSON = JSON.stringify(stocks);
      let contactAdressJSON=JSON.stringify(contactAdress)
      //console.log(stocksJSON);

      const user = await User.findOne({
         where: { id: userId }
      })
      //console.log("USER ORDEN", user)
      let newOrder = await Order.create({
         price: priceTotal,
         userId,
         stocks: stocksJSON,
         stateOrder: estado,
         contactAdress:contactAdressJSON,
      });
      createOrder(user.email, newOrder)
      //console.log("NEW ORDER", newOrder)
      res.send(newOrder);
   } catch (error) {
      console.log(error)
      res.status(400).send(error);
   }
});

orderRouter.put("/:id", async (req, res, next) => {
   // buscar por findAll por id la compra para mandar email la compra de manera especifica
   const { type } = req.query;
   const { id } = req.params;
   const { data } = req.body;
   console.log(type, " ", id, " ", data);

   console.log("data", data);
   try {
      const order = await Order.findOne({ where: { id: id } });
      console.log("order", order.userId);

      const user = await User.findOne({
         where: { id: order.userId }
      })

      console.log(user.email)

      switch (type) {
         case "idpurchase":
            order.idpurchase = data;
            await order.save();
            res.send(`The purchased id has been changed`);
            break;
         case "stateOrder":
            order.stateOrder = data;
            await order.save();
            if(data === "Dispatched"){
               console.log("DISPATCHED DATA", data)
               changeStateOrderDispatched(user.email, data, id)
            }else{
               changeStateOrder(user.email, data, id)
            }
            res.send(`The state has been changed`);
            break;
         case "stocks":
            order.stocks = JSON.stringify(data);
            await order.save();
            res.send(`The state has been changed`);
            break;
         default:
            break;
      }
   } catch (err) {
      console.log(err)
      next(err);
   }
});

module.exports = orderRouter;

/* id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      stocks: {
        type: DataTypes.JSON, //ARRAY(DataTypes.JSON)
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      idpurchase: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      creationdate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      stateOrder:{
        type: DataTypes.ENUM('Creada', 'Cancelada', 'Despachada')
      }
    }*/