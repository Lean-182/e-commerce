const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const ProductRoute = require("./routes/ProducRoute");
const CategoryRoute = require("./routes/CategoryRoute");
const ProductDetailsRoute = require("./routes/ProductDetailsRoute");
const UsersRoute = require("./routes/UsersRoute");
const PurchasedRoute = require("./routes/PurchasedRoute");
const StockRoute = require("./routes/StockRoute");
const CommentRoute = require("./routes/CommentRoute");
const orderRouter = require("./routes/orderRouter");
const FavoriteRoute = require("./routes/FavoriteRoute")
const AuthRoute = require("./routes/authRoutes")
const CloudinaryRoutes = require("./routes/cloudinaryRoutes")

const router = Router();

router.use("/product", ProductRoute);
router.use("/category", CategoryRoute);
router.use("/product", ProductDetailsRoute);
router.use("/users", UsersRoute);
router.use("/purchased", PurchasedRoute);
router.use("/stock", StockRoute);
router.use("/favorites", FavoriteRoute);
router.use("/comment", CommentRoute);
router.use("/orders", orderRouter);
router.use("/auth", AuthRoute)
router.use("/cloudinary", CloudinaryRoutes)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
