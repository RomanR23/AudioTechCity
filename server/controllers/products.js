module.exports = {
    getProducts: async (req, res) => {
        const db = req.app.get('db')
        const result = await db.products.getAllProducts();
        res.status(200).send(result)
    },
    getCartItems: async (req,res) => {
        const db = req.app.get('db')
        const cartItems = await db.products.getCartItems();
        res.status(200).send(cartItems)
    },
    inputProduct: async (req,res)=> {
        const { id, product_name , product_price , product_quantity, product_image } = req.body
        const db = req.app.get('db')
        const date = new Date();
        const { userid } = req.session.user || 0
        const newItem = await db.products.inputProduct([id, product_name , product_price , product_quantity, product_image, userid, date]);
        res.status(200).send(newItem)
    },
    updateExistingProduct: async (req,res) => {
        const { id, product_quantity } = req.body
        const db = req.app.get('db')
        await db.products.updateExistingProduct([product_quantity, id])
        res.status(200).send("product updated!")
    },
    deleteProductCheckout: async (req, res) => {
        const {product_id} = req.body
        const db = req.app.get('db')
        await db.products.deleteProductCheckout([product_id])
        
        res.status(200).send('product deleted from data base!')
        
    },
    clearCheckout: (req, res) => {
        const db = req.app.get('db')
        db.products.clearCheckout()
        res.status(200).send('Checkout Cart Cleared!')
    },
    updateExistingProductCheckout: async (req,res) => {
        const { product_id, product_quantity } = req.body
        const db = req.app.get('db')
        await db.products.updateExistingProduct([product_quantity, product_id])
        res.status(200).send("product updated!")
    },
    clearCheckout: (req, res) => {
        const db = req.app.get('db')
        db.products.clearCheckout()
        res.status(200).send('Checkout Cart Cleared!')
    }
    
}