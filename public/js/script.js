const mp = new MercadoPago('public-key', {
  locale: 'es-MX',
});

const orderData = {
  quantity: 1,
  description: document.getElementById('product-description').textContent,
  price: document.getElementById('unit-price').textContent,
};

document.addEventListener('click', (e) => {
  if (e.target.matches('#checkout-button')) {
    fetch('/create-preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (preference) {
        createCheckoutButton(preference.id);
      })
      .catch(function () {
        alert('Unexpected error');
      });
  }
});

function createCheckoutButton(preferenceId) {
  // Initialize the checkout
  mp.checkout({
    preference: {
      id: preferenceId,
    },
    autoOpen: true,
  });
}
