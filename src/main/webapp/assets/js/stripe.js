$(document).ready(function() {
	initialize();
	checkStatus();
});

function loadStripeConstants() {
	return new Promise((resolve, reject) => {
		fetch('./stripe/constants').then(response => response.json()).then(data => {
			window.secretKey = data.secretKey;
			window.publishableKey = data.publishableKey;
			resolve();
		}).catch(reject);
	})
}

let emailAddress = '';

let stripe;

const form = document.getElementById('payment-form-stripe');

const items = JSON.parse(localStorage.getItem('cart'));

form.addEventListener("submit", handleSubmit)
let elements;

async function initialize() {
	await loadStripeConstants();
	stripe = Stripe(publishableKey);
	//console.log('initializing ...');
	const response = await fetch("./stripe/create-payment-intent", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ items }),
	});

	//console.log(response);
	const { clientSecret } = await response.json();

	const appearance = {
		theme: 'stripe',
	};

	const options = {
		layout: {
			type: 'tabs',
			defaultCollapsed: false,
		},
		clientSecret: clientSecret, appearance: {/*..*/ },
	}
	elements = stripe.elements(options);

	const linkAuthenticationElement = elements.create("linkAuthentication");
	linkAuthenticationElement.mount("#link-authentication-element");

	linkAuthenticationElement.on('change', (event) => {
		emailAddress = event.value.email;
	});

	const paymentElement = elements.create("payment", options);
	paymentElement.mount("#payment-element");
}

async function checkStatus() {
	const clientSecret = new URLSearchParams(window.location.search).get(
		"payment_intent_client_secret"
	);

	if (!clientSecret) {
		return;
	}

	const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

	switch (paymentIntent.status) {
		case "succeeded":
			document.getElementById('orderSubtotal').innerHTML = document.getElementById('subtotalQty').innerHTML;

			await showOrderConfirmation();
			localStorage.removeItem('cart');
			break;
		case "processing":
			alert("Your payment is processing.");
			break;
		case "requires_payment_method":
			alert("Your payment was not successful, please try again.");
			break;
		default:
			alert("Something went wrong.");
			break;
	}
}


async function handleSubmit(e) {
	e.preventDefault();
	setLoading(true);

	const { error } = await stripe.confirmPayment({
		elements,
		confirmParams: {
			// Make sure to change this to your payment completion page
			return_url: 'http://localhost:8080/ecommerceapp/checkout',
			receipt_email: emailAddress,
		},
	});

	// This point will only be reached if there is an immediate error when
	// confirming the payment. Otherwise, your customer will be redirected to
	// your `return_url`. For some payment methods like iDEAL, your customer will
	// be redirected to an intermediate site first to authorize the payment, then
	// redirected to the `return_url`.
	if (error.type === "card_error" || error.type === "validation_error") {
		showMessage(error.message);
	} else {
		showMessage("An unexpected error occurred.");
	}

	setLoading(false);
}

function showMessage(messageText) {
	const messageContainer = document.querySelector("#payment-message");

	messageContainer.classList.remove("hidden");
	messageContainer.textContent = messageText;

	setTimeout(function() {
		messageContainer.classList.add("hidden");
		messageContainer.textContent = "";
	}, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
	if (isLoading) {
		// Disable the button and show a spinner
		document.querySelector("#submit").disabled = true;
		document.querySelector("#spinner").classList.remove("hidden");
		document.querySelector("#button-text").classList.add("hidden");
	} else {
		document.querySelector("#submit").disabled = false;
		document.querySelector("#spinner").classList.add("hidden");
		document.querySelector("#button-text").classList.remove("hidden");
	}
}
