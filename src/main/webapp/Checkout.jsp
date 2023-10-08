<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="Sample Ecommerce Checkout Page" />
<meta name="author" content="Trevor Busk" />
<title>Checkout Page</title>

<!-- Square JS -->
<script type="text/javascript"
	src="https://sandbox.web.squarecdn.com/v1/square.js"></script>

<!-- Stripe JS -->
<script src="https://js.stripe.com/v3/"></script>

<!-- Bootstrap icons-->
<link href="assets/vendor/bootstrap/css/bootstrap.min.css"
	rel="stylesheet" />
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
<link href="https://sandbox.web.squarecdn.com/1.52.0/card-wrapper.css"
	rel="stylesheet" type="text/css" id="sq-single-card-styles">

<!-- Core theme CSS (includes Bootstrap)-->
<link href="assets/css/stylesheet.css" rel="stylesheet" />

</head>
<body class="bg-light">

	<!-- Section-->
	<div class="container">
		<main>
			<div class="py-5 text-center">
				<h2>Checkout Form</h2>
			</div>
			<div class="row g-5">
				<div class="col-md-5 col-lg-4 order-md-last">
					<h4 class="d-flex justify-content-between align-items-center mb-3">
						<span class="text-primary">Your Cart</span> <span
							class="badge bg-primary ms-1 rounded-pill" id="checkoutItemCount"></span>
					</h4>
					<ul class="list-group mb-3" id="checkoutCartItems">
					</ul>
				</div>
				<div class="col-md-7 col-lg-8">
					<h4 class="mb-3">Billing Address</h4>
					<form class="needs-validation was-validated" novalidate
						id="checkoutForm">
						<div class="row">
							<div class="col-md-6 mb-3">
								<label for="firstName">First name</label> <input type="text"
									class="form-control" id="firstName" name="firstName"
									placeholder="" value="" required>
								<div class="invalid-feedback">First name is required.</div>
							</div>
							<div class="col-md-6 mb-3">
								<label for="lastName">Last name</label> <input type="text"
									class="form-control" id="lastName" name="lastName"
									placeholder="" value="" required>
								<div class="invalid-feedback">Last name is required.</div>
							</div>
						</div>
						<div class="mb-3">
							<label for="email"> Email <span class="text-muted">
									(Optional)</span>
							</label> <input type="email" class="form-control" id="email" name="email">
							<div class="invalid-feedback">
								<p>Please enter a valid email address for shipping updates.</p>
							</div>
						</div>
						<div class="mb-3">
							<label for="address"> Address </label> <input type="text"
								class="form-control" id="address" name="address" placeholder=""
								value="" required>
							<div class="invalid-feedback">
								<p>Please enter your shipping address.</p>
							</div>
						</div>
						<div class="mb-3">
							<label for="address2"> Address 2 <span class="text-muted">
									(Optional)</span>
							</label> <input type="text" class="form-control" id="address2"
								name="address2" placeholder="Apartment or suite">
						</div>
						<div class="row">
							<div class="col-md-5 mb-3">
								<label for="country">Country</label> <select
									class="form-select d-block w-100" id="country" name="country"
									required>
									<option value="">Choose...</option>
									<option>United States</option>
								</select>
								<div class="invalid-feedback">Please select a country.</div>
							</div>
							<div class="col-md-4 mb-3">
								<label for="state">State</label> <select
									class="form-select d-block w-100" id="state" name="state"
									required>
									<option value="">Choose...</option>
									<option>Michigan</option>
								</select>
								<div class="invalid-feedback">Please select a state.</div>
							</div>
							<div class="col-md-3 mb-3">
								<label for="zip">Zip Code</label> <input type="number"
									class="form-control" id="zip" min="0" name="zip" max="99999"
									placeholder="" required>

								<div class="invalid-feedback">Zip code is required.</div>
							</div>
						</div>
						<hr class="mb-4">
						<h4 class="mb-3">Payment</h4>
						<hr class="mb-4">
						<input type="hidden" name="tokenFieldP1" id="tokenFieldP1"
							value="default"> <input type="hidden" name="tokenFieldP2"
							id="tokenFieldP2" value="default"> <input type="hidden"
							name="idempotencyKey" id="idempotencyKey" value="default">
						<input type="hidden" name="checkoutSubtotal" id="checkoutSubtotal"
							value="default"> <input type="hidden"
							name="checkoutProducts" id="checkoutProducts" value="default">
					</form>
					<form id="payment-form">
						<div id="card-container"></div>
						<div id="payment-status-container"></div>
					</form>
					<div class="d-grid">
						<button class="btn btn-primary" type="submit" id="payWithSquare"
							form="checkoutForm">Pay With Square</button>
					</div>
					<hr class="mb-4">
					<form id="payment-form-stripe">
						<div id="link-authentication-element">
							<!--Stripe.js injects the Link Authentication Element-->
						</div>
						<div id="payment-element">
							<!--Stripe.js injects the Payment Element-->
						</div>
						<%--<button id="submit" form="payment-form-stripe">
                        <div class="spinner hidden" id="spinner"></div>
                        <span id="button-text">Pay now</span>
                    </button>--%>
						<div id="payment-message" class="hidden"></div>
					</form>
					<div class="d-grid mt-3">
						<button class="btn btn-success" type="submit" id="submit"
							form="payment-form-stripe">
							<div class="spinner hidden" id="spinner"></div>
							<span id="button-text">Pay with Stripe</span>
						</button>
					</div>
				</div>
			</div>
		</main>
		<footer class="py-5 bg-light-subtle">
			<div class="container">
				<p class="m-0 text-center">Copyright &copy; Trevor Busk 2023</p>
			</div>
		</footer>
	</div>

	<div id="receiptModal" class="modal fade" tabindex="-1" role="dialog">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Order Summary</h5>
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
							</tr>
						</thead>
						<tbody id="cartTableBody" style="vertical-align: middle;"
							class="text-center">

						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<p>Subtotal:</p>
					<p id="orderSubtotal"></p>
					<p>+ Fees:</p>
					<p>(2.9% + $0.30)</p>
					<button type="button" class="btn btn-outline-primary"
						data-bs-dismiss="modal" id="removeButton"
						onclick="window.location.href='./'">Home</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Bootstrap core JS-->
	<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
	<script src="assets/vendor/jquery/jquery-3.7.1.min.js"></script>
	<!-- Core theme JS-->
	<script src="assets/js/checkout.js"></script>
	<script src="assets/js/square.js"></script>
	<script src="assets/js/stripe.js"></script>
</body>
</html>
