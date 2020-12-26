import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const loadAllProducts = () => {
		getProducts().then(data => {
			if (data.error) {
				setError(data.error);
			} else {
				setProducts(data);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		loadAllProducts();
	}, []);

	return (
		<Base title="Home Page" description="Welcome to our Gaming Store!">
			<h1 className="text-white">Our Games Collection</h1>
			<div className="row text-center">
				{error ? error : ""}
				{loading ? (
					<>
						<img
							style={{ width: "200px" }}
							src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
							alt="loading"
						/>
						<h3 className="text-white">Loading Games...</h3>
					</>
				) : (
					<>
						<h2 style={{ margin: "20px" }} class="text-white">
							{/* {"Pick a Category: "}&nbsp;&nbsp;&nbsp;
							<input type="radio" id="male" name="gender" value="male" />
							<label for="male">Male</label>&nbsp;&nbsp;&nbsp;
							<input type="radio" id="female" name="gender" value="female" />
							<label for="female">Female</label>&nbsp;&nbsp;&nbsp;
							<input type="radio" id="other" name="gender" value="other" />
              <label for="other">Other</label> 
              OPTION 2:
							{"Pick a Category: "}&nbsp;&nbsp;&nbsp;
							<button className="btn btn-outline-success">Male</button>
							&nbsp;&nbsp;
							<button className="btn btn-outline-success">Male</button>
							&nbsp;&nbsp;
							<button className="btn btn-outline-success">Male</button>
							&nbsp;&nbsp; */}
						</h2>
						<div className="row">
							{products.map((product, index) => {
								return (
									<div key={index} className="col-md-4 mb-4">
										<Card product={product} />
									</div>
								);
							})}
						</div>
					</>
				)}
			</div>
		</Base>
	);
}
