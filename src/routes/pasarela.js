const { Router } = require("express");
const stripe = require("stripe")(
  "sk_test_51LzjIhLcIyy0hyPQUCtHdZLSo5AD686uI7ruRmsyARwb76mnyQH6wDSYBlRXp0claAHjYyTpkxCVixqO0MFlA42G00IPF04Xba"
);
const router = Router();

const YOUR_DOMAIN = "http://localhost:3000";

router.post("/", async (req, res) => {
  const line_items = req.body.cartItem.map((item) => {
    return {
      price_data: {
        unit_amount: item.cost * 100,
        currency: "ARS",
        product_data: { name: item.name, images: [item.img] },
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.status(200).send(session.url);
});
module.exports = router;
