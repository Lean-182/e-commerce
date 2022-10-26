
const { Router } = require("express");
const bcrypt = require("bcrypt");
// const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const { response } = require("express");
const { URL_FRONT } = process.env;
const { sendRegisterEmail, forgotEmail } = require("../Email/mail.config");
const { getTokenData } = require("../tokenVerify/tokenVerify");
// const { googleVerify } = require("../helpers/google-verify.js");

const router = Router();
//Logeo
router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where:
        { username: username, }

    });
    console.log("usuario de logueo", user)
    const passwordCorrect =
      user === null || user.length === 0
        ? false
        : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: "Invalid user or password" });
    }

    const userForToken = user;

    const token = jwt.sign(userForToken.toJSON(), process.env.JWT_secret_key);

    (user.verify === false)
      ? res.redirect("/register").json({ error: "Usuario no verificado" })
      : res.status(200).json({ auth: "User login success", userForToken, token });
  } catch (error) {
    console.log(error)
  }
});

// Registro
router.post("/register", async (req, res) => {

  try {
    const { username, password, email, name, lastName, image, address, phone } = req.body;

    let user = await User.findOne({
      where: {
        email: email
      }
    })

    if (user !== null)
      return res.status(400).send("Usuario ya existe");

    var isAdmin = false
    if (
      email === "rider_shock@outlook.es" ||
      email === "richardd82@gmail.com" ||
      email === "matimogica@gmail.com" ||
      email === "rideralucar@gmail.com" ||
      email === "leandro.valentine92@gmail.com"
    ) {
      isAdmin = true;
    }

    await bcrypt.hash(password, 10, async function (err, hash) {
      try {
        user = await User.create({
          username,
          password: hash,
          email,
          name: name.toLowerCase(),
          lastName: lastName.toLowerCase(),

          image,
          address,
          phone: parseInt(phone),
          typeUser: isAdmin ? "Admin" : "User"

        });
        const token = jwt.sign(JSON.stringify(user), process.env.JWT_secret_key);
        console.log(token, "TOKEN")
        console.log(user, "NEW USER")
        await sendRegisterEmail(email, name, token)
        return res.status(201).json(user);
      } catch (error) {
        return res.status(400).send("EL Error: " + error);
      }
    });
  } catch (e) {
    return res.status(400).send("Error: " + e);
  }

});

router.get("/confirm/:token", async (req, res, next) => {

  try {
    const { token } = req.params

    const data = await getTokenData(token);

    if (data === null) {
      return res.json({
        success: false,
        msg: 'Error al obtener data'
      });
    }

    console.log("DATA", data);

    const { email, id } = data

    console.log(data.email)

    let user = await User.findOne({
      where: {
        email: email
      }
    })
    console.log(user)
    if (id !== user.id) {
      console.log("El id no coincide con el usuario")
    }

    user.verify = true
    await user.save()
    console.log("USER", user)
    res.redirect(`${URL_FRONT}`)
  } catch (error) {
    console.log("Error para verificar token")
  }
})

router.post("/google", async (req, res, next) => {
  const { email, password, name, lastName, image, address } = req.body;

  console.log("entro validacion Google", email, password, name, lastName, image, address);
  let isAdmin = false;
  try {
    var userValidate = await User.findAll({
      where: { email: email },
    });

    console.log("user validate", userValidate);
    if (
      email === "rider_shock@outlook.es" ||
      email === "richardd82@gmail.com" ||
      email === "matimogica@gmail.com" ||
      email === "rideralucar@gmail.com" ||
      email === "leandro.valentine92@gmail.com"
    ) {
      isAdmin = true;
    }

    let passwordHash = await bcrypt.hash(password, 10);

    if (Object.entries(userValidate).length === 0) {
      const userValidate = await User.findOrCreate({
        where: {
          username: email,
          email: email,
          name: name,
          lastName: lastName,
          password: passwordHash,
          image: image,
          address: address,
          typeUser: isAdmin ? "Admin" : "User"
        },
      });
      // await transporter.sendMail({ , // html body
      // }); VA ENVIO DE EMAIL!!!!!!!!!!!
      userValidate = User.findAll({
        where: { email: email },
      });
    }

    console.log(userValidate)

    const userForToken = {
      id: userValidate[0].dataValues.id,
    }

    const token = jwt.sign(userForToken, process.env.JWT_secret_key);

    res.status(200).json({ userValidate, token })
  } catch (err) {
    console.log("entro error");
    next(err);
  }
});

router.post("/verify", verifyToken, (req, res) => {

  jwt.verify(req.token, process.env.JWT_secret_key, async(error, authData) => {
    if (error) {
      res.sendStatus(403);
    }
    else {
      try{
      var  userValidate = await User.findOne({
        where: { id: authData.id },
      });
      
      if(userValidate.length==0)
      res.sendStatus(403);

      res.json({
        mensaje: "Post fue creado",
        userValidate
      })}
      catch(error){
        res.sendStatus(403);
      }
    }
  });

});

router.post("/forgot", async (req, res) => {
  const { email } = req.body

  try {
    let user = await User.findOne({ where: { email: email } })
    console.log(user.email)
    if (user.email === null) {
      return res.status(400).json({ error: "User with this email does not exists." })
    }

    var data = { id: user.id }

    const token = jwt.sign(data, process.env.JWT_secret_key, { expiresIn: "30m" })
    console.log("user de /forgot", user)

    await user.save()

    console.log(token)

    await forgotEmail(email, token)

    console.log("email enviado")

    res.status(200).json({ auth: "email send", token: token })

  } catch (error) {
    console.log(error)
  }

})

router.put("/reset", async (req, res) => {

  try {
    const { password, token } = req.body

    console.log("NEW PASS", password, "  ", token)
    const compare = jwt.verify(token, process.env.JWT_secret_key)

    console.log("COMPARE", compare)
    if (!compare || compare.id == undefined) {
      res.status(400).json({ error: "Wrong or expired token" })
    }

    let user = await User.findOne({ where: { id: compare.id } })
    console.log(user)
    user.password = await bcrypt.hash(password, 10)

    await user.save()
    //res.redirect(`${URL_FRONT}/`)
    console.log("contraseña cambiada")
    res.status(200).json({ auth: "Password changed" });
  } catch (error) {
    console.log(error)
  }
})


function verifyToken(req, res, next) {
  console.log(req.body)
  const beareHeader = req.body['authorization'];
  if (typeof beareHeader !== 'undefined') {
    req.token = beareHeader.split(" ")[1];
    next();
  }
  else
    res.sendStatus(403);
}


module.exports = router;
