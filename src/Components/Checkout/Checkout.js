import React, { useState, useEffect } from 'react';

import './Checkout.css';
import axios from 'axios';

function Checkout() {
	const [cartItems, setCartItems] = useState([]);

	function getCartItems() {
		axios
			.get('/api/cartItems')
			.then((res) => {
				setCartItems(res.data);
			})
			.catch((err) => {
				console.log(`Error:${err}`);
			});
	}

	const checkoutInc = (product) => {
		product.product_quantity += 1;
		axios.post('/api/updateExistingProductCheckout', product).then((_) => {
			setCartItems((current) => [...current]);
		});
	};

	const checkoutDec = (product) => {
		if (product.product_quantity > 1) {
			product.product_quantity -= 1;
			axios.post('/api/updateExistingProductCheckout', product).then((_) => {
				setCartItems((current) => [...current]);
			});
		}
	};

	const checkoutRemove = (product) => {
		axios
			.post('/api/deleteProductCheckout', product)
			.then((_) => getCartItems());
	};

	function checkoutClear() {
		axios.delete('/api/checkoutCart').then((_) => {
			console.log('checkout cleared');
		});
	}

	function checkoutPay() {
		const mappedCartItems = cartItems.map((item) => {
			return { id: item.product_id, quantity: item.product_quantity };
		});
		fetch('/create-checkout-session', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				items: mappedCartItems,
			}),
		})
			.then((res) => {
				if (res.ok) return res.json();
				return res.json().then((json) => Promise.reject(json));
			})
			.then(({ url }) => {
				window.location = url;
			})
			.catch((e) => {
				console.log(e.error);
			});

		checkoutClear();
	}

	const cartArray = cartItems.map((product, index) => {
		return (
			<div className="product-checkout-indv" key={index}>
				<div className="logo-product-checkout">
					<img
						className="product-image-checkout"
						src={product.product_image}
						alt="product"
					></img>
					<p className="product-checkout-p">{product.product_name}</p>
				</div>
				<div className="product-counter-checkout">
					<button
						className="checkout-product-quantity-button"
						onClick={() => checkoutDec(product)}
					>
						-
					</button>
					<div>{product.product_quantity}</div>
					<button
						className="checkout-product-quantity-button"
						onClick={() => checkoutInc(product)}
					>
						+
					</button>
					<button
						className="remove-item-button"
						onClick={() => checkoutRemove(product)}
					>
						Remove Item
					</button>
				</div>
			</div>
		);
	});

	const itemsPrice = cartItems.reduce(
		(a, c) => a + c.product_quantity * c.product_price,
		0
	);

	useEffect(() => {
		getCartItems();
	}, []);

	return (
		<div className="checkout-container-main">
			<div className="checkout-products-info-box">
				<div className="checkout-products-list">{cartArray}</div>

				<div className="checkout-product-payment-container">
					<div>
						<h1 className="checkout-payment-h1">Cart Total</h1>
					</div>

					<div className="checkout-payment-bottom">
						<p>
							<b>Shipping: $0.00 PROMO APPLIED *</b>
						</p>
						<p>
							<b>Cart Total:</b> ${itemsPrice.toFixed(2)}
						</p>
						<button
							className="checkout-pay-button"
							id="button"
							onClick={() => checkoutPay()}
						>
							Checkout & Pay
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
