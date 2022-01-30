require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const {
  register,
  login,
  getUser,
  logout,
  updateUsername,
  updateFirstname,
  updateLastname,
  updatePassword,
} = require("./controllers/user");
const {
  getProducts,
  getCartItems,
  inputProduct,
  updateExistingProduct,
  updateExistingProductCheckout,
  deleteProductCheckout,
  clearCheckout,
} = require("./controllers/products");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
})
  .then((db) => {
    console.log("DB SETUP SUCCESSFUL");
    app.set("db", db);
  })
  .catch((err) => {
    console.log("DB SETUP FAILED, ERROR:", err);
  });

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const storeItems = new Map([
  [1, { priceInCents: 5999, name: "SUDOTACK Studio Mic" }],
  [2, { priceInCents: 4999, name: "Audio-Technica ATH-M20X" }],
  [3, { priceInCents: 13499, name: "Sound BlasterX G6 Hi-Res Amp" }],
  [4, { priceInCents: 2799, name: '24 Pack 12" x 12" Studio Foam' }],
  [5, { priceInCents: 7399, name: "Pyle Audio Mixer Sound Board" }],
  [6, { priceInCents: 6499, name: "Monoprice Microphone Isolation Shield" }],
  [7, { priceInCents: 14999, name: "Pioneer DJ DM-40-21W Speakers" }],
  [8, { priceInCents: 12599, name: "Numark DJ Mixer II" }],
  [9, { priceInCents: 1699, name: "SOULWIT Cable Management-Kit" }],
  [10, { priceInCents: 12999, name: "Roku TV Soundbar with Subwoofer" }],
  [11, { priceInCents: 29999, name: "Hercules DJControl Controller" }],
  [12, { priceInCents: 52599, name: "Acme Eleazar Studio Desk" }],
]);

app.use(express.json());
app.get("/api/products", getProducts);
app.get("/api/cartItems", getCartItems);
app.post("/api/inputProduct", inputProduct);
app.post("/api/updateExistingProduct", updateExistingProduct);
app.post("/api/updateExistingProductCheckout", updateExistingProductCheckout);
app.post("/api/updateUsername", updateUsername);
app.post("/api/updateFirstname", updateFirstname);
app.post("/api/updateLastname", updateLastname);
app.post("/api/updatePassword", updatePassword);
app.post("/api/deleteProductCheckout", deleteProductCheckout);
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
app.post("/api/auth/logout", logout);
app.get("/api/auth/me", getUser);
app.delete("/api/checkoutCart", clearCheckout);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/home`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(SERVER_PORT, (_) => console.log(`running on ${SERVER_PORT}`));
