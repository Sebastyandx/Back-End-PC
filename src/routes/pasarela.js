const { Router } = require("express");
const stripe = require("stripe")(
  "sk_test_51LzjIhLcIyy0hyPQUCtHdZLSo5AD686uI7ruRmsyARwb76mnyQH6wDSYBlRXp0claAHjYyTpkxCVixqO0MFlA42G00IPF04Xba"
);
const router = Router();
const { User } = require("../db.js");
const express = require("express");
const Order = require("../models/Orden");
const { getAllUser, postOrden } = require("./Controllers/usuario");

//const YOUR_DOMAIN = "http://localhost:3000";
const YOUR_DOMAIN = "https://e-commerce-sage-two.vercel.app";
 
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
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["AR"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "ARS",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 500000,
            currency: "ARS",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    metadata: {},
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.status(200).send(session.url);
});
router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;
    // Check if webhook signing is configured.
    let webhookSecret;
    // webhookSecret ="whsec_4a42d188483fc8a2e1432029a2c9e81bfd14e94b6e427ce2a49b793dde076ec5";

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        );
      } catch (err) {
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the checkout.session.completed event

    if (eventType === "checkout.session.completed") {
      let emailUser = data.customer_details.email;
      try {
        let emailExistente = await User.findOne({
          where: { email: emailUser },
        });

        if (emailExistente !== null) {
          let id = data.payment_intent;
          stripe.checkout.sessions.listLineItems(
            data.id,
            {},
            function (err, lineItems) {
              postOrden(emailExistente.email, lineItems.data);
            }
          );
        }
      } catch {
        res.send(400).json("Errr");
      }
    }

    res.status(200).end("Felicitaciones por la compra");
  }
);
module.exports = router;
