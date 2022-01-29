import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

function Home() {
	const [slideshow] = useState([
		'https://studios.aalto.fi/wp-content/uploads/2020/01/A-Pod-Interior-2100x900.jpg',
		'https://cdn-data.motu.com/django_prod/filer_public/2b/5c/2b5c0f00-01dd-4840-86ed-befc14d46f44/m2-overhead-main-slider-.jpg',
		'https://tascam.com/images/products/_tmp/main_img/tascam/us-2x2hr_main.jpg',
	]);
	const [count] = useState(1);

	return (
		<div className="home-container-main">
			<div className="home-content-box">
				<div className="home-limited-offer-div">
					<h1>* LIMITED TIME OFFER * ORDERS OVER $1 FOR FREE SHIPPING!</h1>
				</div>

				<div className="slideshow-pictures-box">
					<div className="picture-displayed-div">
						<img
							className="picture-displayed"
							src={slideshow[count]}
							alt="slideshow-i"
						/>
					</div>

					<div className="shop-now-box">
						<Link to="/products">
							<button className="shop-now-button">SHOP NOW!</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
