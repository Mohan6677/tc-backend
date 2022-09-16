const dotenv = require("dotenv");
const dotenvConfig = require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  getPayment: (req, res) => {
    res.render("payment.ejs", {
      key: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  },
  makePayment: (req, res) => {
    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: "Mohan Tummala",
        address: {
          line1: "3-112,near old post office",
          postal_code: "521137",
          city: "Vijayawada",
          state: "Andhra Pradesh",
          country: "India",
        },
      })
      .then((customer) => {
        return stripe.charges.create({
          amount: 2500, // Charging Rs 25
          description: "Web Development Product",
          currency: "INR",
          customer: customer.id,
        });
      })
      .then((charge) => {
        res.send("Success"); // If no error occurs
      })
      .catch((err) => {
        res.send(err); // If some error occurs
      });
  },
};
