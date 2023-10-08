$(document).ready(function() {
	
});

function loadSquareConstants() {
	return new Promise((resolve, reject) => {
		fetch('./square/constants').then(response => response.json()).then(data => {
			window.appId = data.appId;
			window.locationId = data.locationId;
			resolve();
		}).catch(reject);
	})
}

async function initializeCard(payments) {
	const card = await payments.card();
	await card.attach('#card-container');

	return card;
}

async function createPayment(token) {
	await loadSquareConstants();
	let idempotencyKey = window.crypto.randomUUID();
	const body = JSON.stringify({
		locationId,
		sourceId: token,
		idempotencyKey
	});

	console.log(token.substring(0, 4));
	console.log(token.substring(5, String(token).length));

	document.getElementById('tokenFieldP1').value = token.substring(0, 4);
	document.getElementById('tokenFieldP2').value = token.substring(5, String(token).length);
	document.getElementById('idempotencyKey').value = idempotencyKey;
	console.log(body);
}

async function tokenize(paymentMethod) {

	const tokenResult = await paymentMethod.tokenize();
	if (tokenResult.status === 'OK') {
		console.log(tokenResult.token);
		return tokenResult.token;
	} else {
		let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
		if (tokenResult.errors) {
			errorMessage += ` and errors: ${JSON.stringify(
				tokenResult.errors
			)}`;
		}

		throw new Error(errorMessage);
	}
}


async function handlePaymentMethodSubmission(event, card) {
	event.preventDefault();
	await loadSquareConstants();
	try {
		// disable the submit button as we await tokenization and make a payment request.
		const token = await tokenize(card);
		const paymentResults = await createPayment(
			token
		);
		//alert('Payment successful');
		document.getElementById('orderSubtotal').innerHTML = document.getElementById('subtotalQty').innerHTML;
		await showOrderConfirmation();
		localStorage.removeItem('cart');
		console.debug('Payment Success', paymentResults);
	} catch (e) {
		alert('Payment Failure');
		console.error(e.message);
	}
}

document.addEventListener('DOMContentLoaded', async function() {
	await loadSquareConstants();
	if (!window.Square) {
		throw new Error('Square.js failed to load properly');
	}

	let payments;
	try {
		payments = window.Square.payments(appId, locationId);
	} catch {
		const statusContainer = document.getElementById(
			'payment-status-container'
		);
		statusContainer.className = 'missing-credentials';
		statusContainer.style.visibility = 'visible';
		return;
	}

	let card;
	try {
		card = await initializeCard(payments);
	} catch (e) {
		console.error('Initializing Card failed', e);
		return;
	}

	document.getElementById('payment-form').addEventListener('submit', async function(event) {
		event.preventDefault();
		await handlePaymentMethodSubmission(event, card);
		event.target.submit();
	});

	document.getElementById('checkoutForm').addEventListener('submit', async function(event) {
		event.preventDefault();

		await handlePaymentMethodSubmission(event, card);

		let url = "square/pay";

		let formData = new FormData(event.target);

		let body = new URLSearchParams();

		for (let pair of formData) {
			body.append(pair[0], pair[1]);
		}

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: body
		}).then(response => response.json()).then(data => console.log(data)).catch((error) => console.error('Error: ', error));
	});
});
