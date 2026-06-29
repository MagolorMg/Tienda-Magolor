let cart = [];
const cartItemsList = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const cartCountEl = document.getElementById('cart-count');

// Escuchar clics en botones de añadir
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));

        addToCart(id, name, price);
    });
});

function addToCart(id, name, price) {
    // Verificar si ya existe para aumentar cantidad
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    updateUI();
}

function updateUI() {
    // Limpiar lista
    cartItemsList.innerHTML = '';
    
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} (x${item.quantity}) - $${item.price * item.quantity}`;
        cartItemsList.appendChild(li);
        
        total += item.price * item.quantity;
        count += item.quantity;
    });

    totalPriceEl.textContent = total.toFixed(2);
    cartCountEl.textContent = count;
}

// Vaciar carrito
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    updateUI();
});