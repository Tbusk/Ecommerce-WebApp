<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="Sample Ecommerce Products Page" />
<meta name="author" content="Trevor Busk" />
<title>Ecommerce Page - Products</title>

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
					<li class="nav-item"><a class="nav-link active"
						aria-current="page" href="./">Home</a></li>
					<li class="nav-item"><a class="nav-link" href="./admin">Admin
							View</a></li>
				</ul>
				<form class="d-flex">
					<button class="btn btn-outline-dark" type="button"
						onclick="getCartItems()">
						<i class="bi-cart-fill me-1"></i> Cart <span
							class="badge bg-dark text-white ms-1 rounded-pill" id='cartCount'></span>
					</button>
				</form>
			</div>
		</div>
	</nav>

	<div id="cartModal" class="modal fade" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Cart</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Close"></button>
				</div>
				<div class="modal-body" id="modalBody">
					<table class="table table-hover table-bordered">
						<thead class="table-light text-center"
							style="vertical-align: middle;">
							<tr>
								<th scope="col">Product</th>
								<th scope="col">Price</th>
								<th scope="col">Qty</th>
								<th scope="col">Total Price</th>
								<th scope="col">Remove</th>
							</tr>
						</thead>
						<tbody id="cartTableBody" style="vertical-align: middle;"
							class="text-center">

						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<p>Subtotal</p>
					<p id="subtotal"></p>
					<button type="button" class="btn btn-outline-dark"
						data-bs-dismiss="modal">Cancel</button>
					<button type="button" class="btn btn-outline-primary"
						data-bs-dismiss="modal" id="removeButton"
						onclick="window.location.href='./checkout'">Checkout</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Header-->
	<header class="bg-dark py-5">
		<div class="container px-4 px-lg-5 my-5">
			<div class="text-center text-white">
				<h1 class="display-4 fw-bolder">Get Essentials</h1>
				<p class="lead fw-normal text-white-50 mb-0">Your one stop shop
					for all items!</p>
			</div>
		</div>
	</header>

	<!-- Search Field-->
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
	<script src="assets/js/store.js"></script>
</body>
</html>
