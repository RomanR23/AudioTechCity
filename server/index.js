require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const { getProducts, getCartItems, inputProduct, updateExistingProduct, updateExistingProductCheckout, deleteProductCheckout } = require('./controllers/products')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized:false
    },
}).then( db => {
    console.log('DB SETUP SUCCESSFUL')
    app.set('db', db);
}).catch( err => {
    console.log('DB SETUP FAILED, ERROR:', err)
})

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized:true,
    cookie : {
        maxAge: 1000*60*60*24
    }
}))

app.use(express.json());
app.get('/api/products', getProducts);
app.get('/api/cartItems', getCartItems);
app.post('/api/inputProduct', inputProduct);
app.post('/api/updateExistingProduct', updateExistingProduct);
app.post('/api/updateExistingProductCheckout', updateExistingProductCheckout);
app.post('/api/deleteProductCheckout', deleteProductCheckout)

app.listen(SERVER_PORT, _ => console.log(`running on ${SERVER_PORT}`));