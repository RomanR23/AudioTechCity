import React, { useState, useEffect } from 'react';
import './Products.css'
import axios from 'axios';

function Products(){

const [products, setProducts] = useState([])
const [cartItems, setCartItems] = useState([])



function getProducts(){
    axios.get('/api/products')
    .then( res => {
        setProducts(res.data)
    }).catch( err => {
        console.log(`Error:${err}`)
    })
}

function getCartItems(){
    console.log('getCartItemsFired')
    axios.get('/api/cartItems')
    .then( res => {
        setCartItems(res.data)
    }).catch( err => {
        console.log(`Error:${err}`)
    })
}

const quantityInc = (product) => {
    product.product_quantity += 1
    setProducts(current => [...current])
}

const quantityDec = (product) => {
    if(product.product_quantity > 0){
        product.product_quantity -= 1
        setProducts(current => [...current])

    }
}

const onAdd = (product) => {
    const exist = cartItems.find(x => x.product_id === product.id);

    if (exist){

        product.product_quantity += exist.product_quantity
        axios.post('/api/updateExistingProduct', product)
        .then(()=>{
            product.product_quantity = 0
            getCartItems()
        })
    } else {
        axios.post('/api/inputProduct', product)
        .then(()=> {
            product.product_quantity = 0
            getCartItems()
        })
    }
};


let array = products.map((product, index) => {
    return <div className = 'indv-product-div' key={index}>

                <div>
                <img className = 'product-image-products' src= {product.product_image} alt='product-i'/>
                </div>

                <div className = 'product-name-products'>{product.product_name} </div>
                <div className ="product-price-products">{`$${product.product_price}`}</div>
                
                    <div className ="indv-product-button-container">
                        <button className="indv-quantity" onClick={()=> quantityDec(product)} >-</button>
                        <div className ="quantityCounter">{product.product_quantity}</div>
                        <button className="indv-quantity" onClick={()=> quantityInc(product)}>+</button>
                    </div>

                <div>
                <button className="addToCart" onClick={()=> onAdd(product)} >Add To Cart</button>
                </div>
                
            </div>
            
})


useEffect(()=> {
    getProducts()
    getCartItems()
},[])

    return (
        <div className='products-container-main'>
            <div className='products-content-box'>
                {array}
            </div>

        </div>
    )
    
}

export default Products;