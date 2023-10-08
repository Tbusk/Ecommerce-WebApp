$(document).ready(function() {
	getCheckoutItems();
	
	// If successfully checked out with Stripe, this will launch the receipt modal
	let urlParams = new URLSearchParams(window.location.search);
	if(urlParams.get(
		"payment_intent_client_secret"
	)){
		document.getElementById('orderSubtotal').innerHTML = document.getElementById('subtotalQty').innerHTML;
		showOrderConfirmation();
		localStorage.removeItem('cart');
	}
});

// Shows receipt modal containing purchased items.
function showOrderConfirmation() {
	$("#receiptModal").modal('show');

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
			"</tr>"
	}
	document.getElementById('cartTableBody').innerHTML = lstResults;
}

// Displays checkout items on the checkout page under the "Your Cart"" section
function getCheckoutItems() {
	let cartItems = JSON.parse(localStorage.getItem('cart'));
	let lstResults = "";
	let subtotal = 0.0;
	let itemNamesList = "";

	for (let i = 0; i < cartItems.length; i++) {
		itemNamesList += cartItems[i].shortTitle + " x " + cartItems[i].quantity + " ";
		let itemTotal = (cartItems[i].quantity * cartItems[i].price);
		subtotal += itemTotal;
		lstResults += "<li class=\"list-group-item d-flex justify-content-between lh-sm\">" +
			"                        <div>" +
			"                            <h6 class=\"my-0\">" + cartItems[i].shortTitle + "</h6>" +
			"<small class='text-muted'>$" + cartItems[i].price.toFixed(2) + " x " + cartItems[i].quantity + "</small>" +
			"                        </div>" +
			"                        <span class=\"text-muted\">$" + itemTotal.toFixed(2) + "</span>" +
			"                    </li>";
	}
	lstResults += "<li class='list-group-item d-flex justify-content-between'>" +
		"<span>Total (USD)</span>" + "" +
		"<strong id='subtotalQty'>$" + subtotal.toFixed(2) + "</strong>"
	"</li>";
	document.getElementById('checkoutCartItems').innerHTML = lstResults;
	document.getElementById('checkoutProducts').value = itemNamesList;
	document.getElementById('checkoutSubtotal').value = subtotal.toFixed(2);
}
