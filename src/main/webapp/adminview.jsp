<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="Sample Ecommerce Admin Page" />
<meta name="author" content="Trevor Busk" />
<title>Ecommerce Page - Admin View</title>

<!-- Bootstrap icons-->
<link href="assets/vendor/bootstrap/css/bootstrap.min.css"
	rel="stylesheet" />
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

<!-- Stylesheet -->
<link href="assets/css/stylesheet.css" rel="stylesheet" />
</head>
<body>
	<!-- Navigation-->
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container px-4 px-lg-5">
			<a class="navbar-brand" href="#!">Test Web Store</a>
			<button class="navbar-toggler" type="button"
				data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent" aria-expanded="false"
				aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
					<li class="nav-item"><a class="nav-link" href="./">Home</a></li>
				</ul>
				<form class="d-flex">
					<button class="btn btn-outline-dark" type="submit">
						<i class="bi bi-file-code"></i> Admin View
					</button>
				</form>
			</div>
		</div>
	</nav>
	<!-- Header-->
	<header class="bg-dark py-5">
		<div class="container px-4 px-lg-5 my-5">
			<div class="text-center text-white">
				<h1 class="display-4 fw-bolder">Admin View</h1>
				<p class="lead fw-normal text-white-50 mb-0">Update, add, and
					delete product here!</p>
			</div>
		</div>
	</header>

	<!-- Add Product Section -->
	<div class="container px-4 px-sm-5 mt-5">
		<div class="input-group ">
			<span class="input-group-text" id="searchAddon"><i
				class="bi bi-search"></i></span> <input class="form-control"
				placeholder="search for an item" type="text" id="searchbar"
				aria-describedby="searchAddon">
			<button class="btn btn-secondary dropdown-toggle" type="button"
				data-bs-toggle="dropdown" aria-expanded="false">Sort</button>
			<ul class="dropdown-menu">
				<li><a class="dropdown-item" onclick="selectSortType('')">Default</a></li>
				<li><a class="dropdown-item"
					onclick="selectSortType('Price: high to low')">Price: high to
						low</a></li>
				<li><a class="dropdown-item"
					onclick="selectSortType('Price: low to high')">Price: low to
						high</a></li>
				<li><a class="dropdown-item"
					onclick="selectSortType('Rating: high to low')">Rating: high to
						low</a></li>
			</ul>

			<a class="btn btn-outline-dark" data-bs-target="#collapseItem"
				data-bs-toggle="collapse" role="button" aria-expanded="false"
				aria-controls="collapseItem"> Add a product </a>
		</div>
		<div class="collapse" id="collapseItem">
			<div class="card card-body">
				<div class="form-group col-centered mb-2">
					<label for="addShortTitle" class="form-label">Short Title</label> <input
						type="text" class="form-control" id="addShortTitle">
				</div>
				<div class="form-group col-centered mb-2">
					<label for="addLongTitle" class="form-label">Long Title</label> <input
						type="text" class="form-control" id="addLongTitle">
				</div>
				<div class="form-group col-centered mb-2">
					<label for="addDescription" class="form-label">Description</label>
					<input type="text" class="form-control" id="addDescription">
				</div>
				<div class="form-group col-centered mb-2">
					<label for="addCategory" class="form-label">Category</label> <input
						type="text" class="form-control" id="addCategory">
				</div>
				<div class="form-group col-centered mb-2">
					<label for="addImageURL" class="form-label">Image URL</label> <input
						type="text" class="form-control" id="addImageURL">
				</div>
				<div class="form-group col-centered mb-2">
					<label for="addRating" class="form-label">Rating</label> <input
						type="text" class="form-control" id="addRating">
				</div>
				<div class="form-group col-centered mb-2">
					<label for="addPrice" class="form-label">Price</label> <input
						type="text" class="form-control" id="addPrice">
				</div>
				<div class="d-flex justify-content-center">
					<button type="button" class="btn btn-outline-danger me-2"
						data-bs-toggle="collapse" data-bs-target="#collapseItem">Cancel</button>
					<button type="button" class="btn btn-outline-success me-2"
						type="submit" onclick="addProduct();">Add Product</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Section-->
	<section class="py-5">
		<div class="container px-4 px-lg-5 mt-5">
			<div
				class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
				id="cards"></div>
		</div>
	</section>

	<div id="updateProduct" class="modal fade" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Update Product</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body" style="padding: 20px">
					<div class="form-group col-centered">
						<label for="productID">ID</label> <input type="text"
							class="form-control" id="productID" readonly>
					</div>
					<div class="form-group col-centered">
						<label for="shortTitle">Short Title</label> <input type="text"
							class="form-control" id="shortTitle">
					</div>
					<div class="form-group col-centered">
						<label for="longTitle">Long Title</label> <input type="text"
							class="form-control" id="longTitle">
					</div>
					<div class="form-group col-centered">
						<label for="description">Description</label> <input type="text"
							class="form-control" id="description">
					</div>
					<div class="form-group col-centered">
						<label for="category">Category</label> <input type="text"
							class="form-control" id="category">
					</div>
					<div class="form-group col-centered">
						<label for="imageURL">Image URL</label> <input type="text"
							class="form-control" id="imageURL">
					</div>
					<div class="form-group col-centered">
						<label for="rating">Rating</label> <input type="text"
							class="form-control" id="rating">
					</div>
					<div class="form-group col-centered">
						<label for="price">Price</label> <input type="text"
							class="form-control" id="price">
					</div>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-outline-danger"
						data-bs-dismiss="modal">Cancel</button>
					<button type="button" class="btn btn-outline-success" type="submit"
						onclick="postProductUpdate()" id="update">Update</button>
				</div>
			</div>
		</div>
	</div>

	<div id="removeProduct" class="modal fade" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Remove Product</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<p class="modal-body" id="removeModalBody"></p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-outline-dark"
						data-bs-dismiss="modal">Cancel</button>
					<button type="button" class="btn btn-outline-danger"
						data-bs-dismiss="modal" id="removeButton">Remove</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Footer-->
	<footer class="py-5 bg-dark">
		<div class="container">
			<p class="m-0 text-center text-white">Copyright &copy; Trevor
				Busk 2023</p>
		</div>
	</footer>
	<!-- Bootstrap core JS-->
	<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
	<script src="assets/vendor/jquery/jquery-3.7.1.min.js"></script>
	<!-- Core theme JS-->
	<script src="assets/js/admin.js"></script>
</body>
</html>
