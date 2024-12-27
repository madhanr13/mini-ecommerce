const OrderModel = require("../models/orderModel");
const productModel = require("../models/productModel")

//Create Order = api/v1/order
exports.createOrder = async (req, res, next) => {
  const cartItems = req.body;
  const amount = Number(
    cartItems.reduce((acc, item) => (acc + item.products.price) * item.qty, 0)
  ).toFixed(2);
  const status = "pending...";

  const order = await OrderModel.create({ cartItems, amount, status });

  //Updating stock 

  cartItems.forEach(async (item) => {
    const product =await productModel.findById(item.product._id)
    product.stock = product.stock - item.qty
    await product.save()
  })

  res.json({
    success: true,
    order,
  });
};
