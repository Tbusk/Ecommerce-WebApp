$(document).ready(function() {
	getStoreItems();
	document.getElementById('cartCount').innerHTML = "" + getCartItemCount();
	document.getElementById('searchbar').addEventListener('keydown', function(event) {
		if (event.key == 'Enter') {
			let item = $("#searchbar").val();
			console.log(item);
			searchForItems(item);
		}
	});
});

let apiURL = "./store/products-api";
function addToCart(id, shortTitle, price) {
	let cart = JSON.parse(localStorage.getItem('cart')) || [];
	let updated = false;

	for (var i = 0; i < cart.length; i++) {
		if (cart[i].id === id) {
			cart[i].quantity += 1;
			updated = true;
			break;
		}
	}

	if (!updated) {
		let params = {
			"id": id, "shortTitle": shortTitle,
			"price": price, "quantity": 1
		}
		cart.push(params);
	}

	localStorage.setItem('cart', JSON.stringify(cart));

	document.getElementById('cartCount').innerHTML = "" + cart.length;
	console.log("Cart Length: " + cart.length);
}

function getCart() {
	let cart = JSON.parse(localStorage.getItem('cart')) || [];

	return cart;
}

function getCartItemCount() {
	let cart = JSON.parse(localStorage.getItem('cart')) || [];
	return cart.length;
}

function removeCartItem(id) {

	let cartList = JSON.parse(localStorage.getItem('cart'));
	let arraySize = cartList.length;

	for (var i = 0; i < arraySize; i++) {
		if (cartList[i].id === id) {
			cartList.splice(i, 1);
			break;
		}
	}
	localStorage.setItem('cart', JSON.stringify(cartList));
	getCartItems();
	$("#cartCount").text(getCartItemCount());
}

function getCartItems() {

	$("#cartModal").modal('show');

	console.log(JSON.parse(localStorage.getItem('cart')));

	let cartItems = JSON.parse(localStorage.getItem('cart'));

	let subtotal = 0.0;

	let lstResults = "";

	for (let i = 0; i < cartItems.length; i++) {
		let itemTotal = (cartItems[i].quantity * cartItems[i].price);
		subtotal += itemTotal;
		lstResults +=
			"<tr>" + "<td>" + cartItems[i].shortTitle + "</td>" +
			"<td>$" + cartItems[i].price.toFixed(2) + "</td>" +
			"<td>" + cartItems[i].quantity + "</td>" +
			"<td>$" + itemTotal.toFixed(2) + "</td>" +
			"<td style='padding: 0px;'><button type='button' class='btn' onclick='removeCartItem(" + cartItems[i].id + ")'><i class='bi bi-trash'></i></button>" + "</td>" + "</tr>"


	}
	document.getElementById('cartTableBody').innerHTML = lstResults;
	$("#subtotal").text("$" + (Number(subtotal).toFixed(2)));
}

function selectSortType(answer) {
	switch (answer) {
		case "Price: high to low":
			apiURL = "./store/products-api/sortedByPrice-high";
			break;
		case "Price: low to high":
			apiURL = "./store/products-api/sortedByPrice-low";
			break;
		case "Rating: high to low":
			apiURL = "./store/products-api/sortedByRating";
			break;
		default: apiURL = "./store/products-api";
	}
	$('#cards').empty();
	getStoreItems();
}

function searchForItems(item) {
	if (item == "" || item == null) {

		apiURL = "./store/products-api";
		document.getElementById('cards').innerHTML = '';


		getStoreItems();


	} else {
		fetch(`/ecommerce/store/products-api/search?item=${encodeURIComponent(item)}`).
			then(response => response.json()).then(data => {
				$.each(data, function(key, value) {

					var lstResults =
						"<div class=\"col mb-5\">" +
						"    <div class=\"card h-100\">" +
						"        <!-- Product image-->" +
						"        <img class=\"card-img-top\" src=\"" + value.imageURL + "\" alt=\"...\" style='object-fit: contain; height: 200px; width: 100%; padding-top: 20px; padding-left: 10px; padding-right: 10px;'/>" +
						"        <!-- Product details-->" +
						"        <div class=\"card-body p-4\">" +
						"            <div class=\"text-center\">" +
						"                <!-- Product name-->\n" +
						"                <h5 class=\"fw-bolder\">" + value.shortTitle + "</h5>" +
						"<div class=\"d-flex justify-content-center small text-warning mb-2\">";

					for (var i = 0; i < Math.floor(value.rating); i++) {
						lstResults += "<div class=\"bi-star-fill\"></div>";
					}
					if (Math.round(value.rating) > value.rating) {
						lstResults += "<div class=\"bi-star-half\"></div>";
					}

					lstResults += "                </div>" +
						"                $" + value.price.toFixed(2) +
						"            </div>" +
						"        </div>" +
						"        <div class=\"card-footer p-4 pt-0 border-top-0 bg-transparent\">" +
						"            <div class=\"text-center\"><a class=\"btn btn-outline-dark mt-auto\" href=\"#\">Add to cart</a></div>" +
						"        </div>" +
						"    </div>" +
						"</div>";

					document.getElementById('cards').innerHTML += lstResults;
				});
				console.log(data);

			}).catch((error) => console.log(error));
		document.getElementById('cards').innerHTML = '';
		document.getElementById('searchbar').value = '';
	}
}

function getStoreItems() {

	$.ajax({
		url: apiURL,
		type: 'GET',
		dataType: "json",
		contentType: "application/json",
	}).fail(function(response) {
		console.log(JSON.stringify(response));

	}).done(function(response) {
		console.log(response);

		$.each(response, function(key, value) {

			var lstResults =
				"<div class=\"col mb-5\">" +
				"    <div class=\"card h-100\">" +
				"        <!-- Product image-->" +
				"        <img class=\"card-img-top\" src=\"" + value.imageURL + "\" alt=\"...\" style='object-fit: contain; height: 200px; width: 100%; padding-top: 20px; padding-left: 10px; padding-right: 10px;'/>" +
				"        <!-- Product details-->" +
				"        <div class=\"card-body p-4\">" +
				"            <div class=\"text-center\">" +
				"                <!-- Product name-->\n" +
				"                <h5 class=\"fw-bolder\">" + value.shortTitle + "</h5>" +
				"<div class=\"d-flex justify-content-center small text-warning mb-2\">";

			for (var i = 0; i < Math.floor(value.rating); i++) {
				lstResults += "<div class=\"bi-star-fill\"></div>";
			}
			if (Math.round(value.rating) > value.rating) {
				lstResults += "<div class=\"bi-star-half\"></div>";
			}

			lstResults += "                </div>" +
				"                $" + value.price.toFixed(2) +
				"            </div>" +
				"        </div>" +
				"        <div class=\"card-footer p-4 pt-0 border-top-0 bg-transparent\">" +
				"            <div class=\"text-center\"><a class=\"btn btn-outline-dark mt-auto\" href=\"#\" onclick='addToCart(" + value.id + ",`" + value.shortTitle + "`," + value.price + ")'>Add to cart</a></div>" +
				"        </div>" +
				"    </div>" +
				"</div>";

			document.getElementById('cards').innerHTML += lstResults;
		});
	});
}