const mp = new MercadoPago('TEST-58c4af93-1789-4527-abfc-2216bcd3f5d4', {
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
