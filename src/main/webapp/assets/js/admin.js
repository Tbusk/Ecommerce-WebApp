$(document).ready(function() {
	console.log(window.location.pathname);
	adminGetStoreItems();
	document.getElementById('searchbar').addEventListener('keydown', function(event) {
		if (event.key == 'Enter') {
			let item = $("#searchbar").val();
			console.log(item);
			searchForItems(item);
		}
	});
});

let apiURL = "./store/products-api";
function adminGetStoreItems() {

	$.ajax({
		url: apiURL,
		type: 'GET',
		dataType: "json",
		contentType: "application/json",
	}).fail(function(response) {
		console.log(JSON.stringify(response));

	}).done(function(response) {

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
				"        <div class=\"card-footer p-4 pt-0 border-top-0 bg-transparent me-2\">" +
				"            <div class=\"text-center\">" +
				"            <a class=\"btn btn-outline-success mt-1\" onclick=updateProduct('" + value.id + "') data-toggle='modal' >Update</a> " +
				"            <a class=\"btn btn-outline-danger mt-1\" onclick=removeProduct('" + value.id + "') data-toggle='modal' >Remove</a></div>" +
				"        </div>" +
				"    </div>" +
				"</div>";

			document.getElementById('cards').innerHTML += lstResults;
		});
	});
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
	adminGetStoreItems();
}

function searchForItems(item) {
	if (item == "" || item == null) {

		apiURL = "./store/products-api";
		document.getElementById('cards').innerHTML = '';

		adminGetStoreItems();


	} else {
		fetch(`./store/products-api/search?item=${encodeURIComponent(item)}`).
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
				"        <div class=\"card-footer p-4 pt-0 border-top-0 bg-transparent me-2\">" +
				"            <div class=\"text-center\">" +
				"            <a class=\"btn btn-outline-success mt-1\" onclick=updateProduct('" + value.id + "') data-toggle='modal' >Update</a> " +
				"            <a class=\"btn btn-outline-danger mt-1\" onclick=removeProduct('" + value.id + "') data-toggle='modal' >Remove</a></div>" +
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

function addProduct() {

	var shortTitle = $("#addShortTitle").val();
	var longTitle = $("#addLongTitle").val();
	var description = $("#addDescription").val();
	var category = $("#addCategory").val();
	var imageURL = $("#addImageURL").val();
	var rating = $("#addRating").val();
	var price = $("#addPrice").val();

	if (shortTitle == "") {
		alert("short title field cannot be blank!");
		$("#addShortTitle").focus();
		return;
	}
	if (longTitle == "") {
		alert("long title field cannot be blank!");
		$("#addLongTitle").focus();
		return;
	}
	if (rating == "") {
		alert("rating field cannot be blank!");
		$("#addRating").focus();
		return;
	}
	if (price == "") {
		alert("price field cannot be blank!");
		$("#addPrice").focus();
		return;
	}
	if (category == "") {
		alert("category field cannot be blank!");
		$("#addCategory").focus();
		return;
	}
	if (imageURL == "") {
		alert("imageURL field cannot be blank!");
		$("#addImageURL").focus();
		return;
	}

	if (description == "") {
		alert("description field cannot be blank!");
		$("#addDescription").focus();
		return;
	}

	var params = {
		shortTitle: shortTitle,
		longTitle: longTitle, description: description, category: category,
		imageURL: imageURL, price: price, rating: rating
	}

	$.ajax({
		url: "./store/",
		type: 'POST',
		contentType: "application/json",
		data: JSON.stringify(params)
	}).fail(function(response) {
		console.log(JSON.stringify(response));
	}).done(function(response) {
		window.location = "./admin";
		location.reload();
	});

}

function updateProduct(id) {

	$("#updateProduct").modal('show');

	$.ajax({

		url: './store/products-api/' + id,
		type: 'GET',
		contentType: "application/json"
	}).fail(function(response) {
		console.log(JSON.stringify(response))
		console.log("GET error.");
	}).done(function(response) {
		console.log(response);
		$("#productID").val(response.id);
		$("#shortTitle").val(response.shortTitle);
		$("#longTitle").val(response.longTitle);
		$("#description").val(response.description);
		$("#category").val(response.category);
		$("#imageURL").val(response.imageURL);
		$("#rating").val(response.rating);
		$("#price").val(response.price);
	})

}

function removeProduct(id) {
	$("#removeModalBody").text("Are you sure you want to remove ");
	$("#removeProduct").modal('show');

	$.ajax({
		url: './store/products-api/' + id,
		type: 'GET',
		contentType: 'application/json'
	}).fail(function(response) {
		console.log(JSON.stringify(response))
		console.log("GET error.");
	}).done(function(response) {
		console.log(response);
		$("#removeModalBody").append("\"" + response.shortTitle + "\"?");
		$(document).on('click', '#removeButton', function() {
			deleteProductRecord(response.id);
			location.reload();
		});

	})
}

function deleteProductRecord(id) {

	$.ajax({
		url: "./store/products-api/" + id,
		type: 'DELETE'
	}).fail(function(response) {
		console.log(JSON.stringify(response));
	}).done(function(response) {
		window.location = "./admin";
	});
}

function postProductUpdate() {

	var productID = $("#productID").val();
	var shortTitle = $("#shortTitle").val();
	var longTitle = $("#longTitle").val();
	var description = $("#description").val();
	var category = $("#category").val();
	var imageURL = $("#imageURL").val();
	var rating = $("#rating").val();
	var price = $("#price").val();

	var params = {
		id: productID, shortTitle: shortTitle,
		longTitle: longTitle, description: description, category: category,
		imageURL: imageURL, rating: rating, price: price
	}

	$.ajax({
		url: "./store/products-api/" + productID,
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(params)
	}).fail(function(response) {
		console.log(JSON.stringify(response));
	}).done(function(response) {
		window.location = "./admin";
		alert("Product " + productID + " updated.");
	})
}
