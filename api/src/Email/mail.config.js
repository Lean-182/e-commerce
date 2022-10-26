const jwt = require("jsonwebtoken");
const CourierClient = require("@trycourier/courier").CourierClient;
const courier = CourierClient({
  authorizationToken: process.env.COURRIER_API_KEY,
});
const { URL_BACK,URL_FRONT } = process.env;

  const sendRegisterEmail = async (email, name, token) => {
  try {
    
    await courier.send({
        message: {
            to: {  
              email: email,
            },
            content: {
              version: "2022-01-01",
              title: "WELCOME TO ALIEN STREET",
              elements:[
                {
                  type:"text",
                  content:"Hi {{name}}, thank you for registering on our page, to activate your account click on the following button:  "
                },
                {
                  type:"action",
                  style:"link",
                  content:"Confirm your account!",
                  href: "{{survey_link}}"
                },
                {
                  type: "image",
                  src: "{{image_alien}}",
                  align: "center",
                  altText: "Street Alien Image",
                  height: "50px",
                  width: "200px"
              }
              ]            
            },
            data:{
              survey_link: `${URL_BACK}/auth/confirm/${token}`,
              email: email,
              image_alien: "https://iphoneswallpapers.com/wp-content/uploads/2021/03/Alien-Neon-iPhone-Wallpaper.jpg",
              name: name
            },
            routing: {
              method: "single",
              channels: ["email"],
            },
          },
      });
  } catch (error) {
    console.log(error)
  }

  }


  const forgotEmail = async (email, token) => {
    await courier.send({

      message: {
        to: {  
          email: email,
        },
        content: {
          version: "2022-01-01",
          title: "Recover your password",
          elements:[
            {
              type:"text",
              content:"To recover your password, click on the following button:  "
            },
            {
              type:"action",
              style:"link",
              content:"Recover password!",
              href: "{{survey_link}}"
            },
            {
              type: "image",
              src: "{{image_alien}}",
              align: "center",
              altText: "Street Alien Image",
              height: "50px",
              width: "200px"
          }
          ]
        },
        data:{
          survey_link: `${URL_FRONT}/reset/${token}`,
          email: email,
          image_alien: "https://iphoneswallpapers.com/wp-content/uploads/2021/03/Alien-Neon-iPhone-Wallpaper.jpg",
        },
        routing: {
          method: "single",
          channels: ["email"],
        },
      },
  });  
  }

  const changeStateOrderDispatched = async (email, state, id) => {
    
        await courier.send({

          message: {
            to: {  
              email: email,
            },
            content: {
              version: "2022-01-01",
              title: "State order, id: {{id}}",
              elements:[
                {
                  type:"text",
                  content:"Your order is in the status: {{state}}, please leave us a product review",
                },
                {
                  type:"action",
                  style:"link",
                  content:"Order details!",
                  href: "{{survey_link}}"
                },
                {
                  type: "image",
                  src: "{{image_alien}}",
                  align: "center",
                  altText: "Street Alien Image",
                  height: "50px",
                  width: "200px"
              }
              ]
            },
            data:{
              survey_link: `${URL_FRONT}/OrderDetails/${id}`,
              state: state,
              id: id,
              email: email,
              image_alien: "https://iphoneswallpapers.com/wp-content/uploads/2021/03/Alien-Neon-iPhone-Wallpaper.jpg",
            },
            routing: {
              method: "single",
              channels: ["email"],
            },
          },
      });  
    }

    const changeStateOrder = async (email, state, id) => {
    
      await courier.send({

        message: {
          to: {  
            email: email,
          },
          content: {
            version: "2022-01-01",
            title: "State order, id: {{id}}",
            elements:[
              {
                type:"text",
                content:"Your order is in the status: {{state}}, when it is dispatched we will send you an email so you can leave us a review, thank you very much for your purchase.",
              },
              {
                type: "image",
                src: "{{image_alien}}",
                align: "center",
                altText: "Street Alien Image",
                height: "50px",
                width: "200px"
            }
            ]
          },
          data:{
            state: state,
            id: id,
            email: email,
            image_alien: "https://iphoneswallpapers.com/wp-content/uploads/2021/03/Alien-Neon-iPhone-Wallpaper.jpg",
          },
          routing: {
            method: "single",
            channels: ["email"],
          },
        },
    });  
  }

      const createOrder = async (email, data) => {
       const stock = JSON.parse(data.stocks)
       const address = JSON.parse(data.contactAdress)
       console.log("STOCK", stock)
       console.log( "ADRESS", address)
       let stockNames = stock.map(n => n.name)
       let stockPrice = stock.map(p => p.value)
       let priceTotal = 0
       for (let i = 0; i < stockPrice.length; i++) {
        priceTotal += stockPrice[i]; 
       }
        await courier.send({
          message: {
            to: {  
              email: email,
            },
            content: {
              version: "2022-01-01",
              title: "Details of your purchase",
              elements:[
                {
                  type:"text",
                  content:"You have bought {{ordersNames}}, for a total price of ${{price}}. For more information, click on the link",
                },
                {
                  type:"action",
                  style:"link",
                  content:"Your orders!",
                  href: "{{survey_link}}"
                },
                {
                  type: "image",
                  src: "{{image_alien}}",
                  align: "center",
                  altText: "Street Alien Image",
                  height: "50px",
                  width: "200px"
              }
              ]
            },
            data:{
              ordersNames: stockNames,
              email: email,
              price: priceTotal,
              survey_link: `${URL_FRONT}/OrdersUser`,
              image_alien: "https://iphoneswallpapers.com/wp-content/uploads/2021/03/Alien-Neon-iPhone-Wallpaper.jpg",
            },
            routing: {
              method: "single",
              channels: ["email"],
            },
          },
      });  
      }


  module.exports = {
    sendRegisterEmail,
    forgotEmail,
    changeStateOrder,
    changeStateOrderDispatched,
    createOrder
  }