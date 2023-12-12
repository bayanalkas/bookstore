document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
});

function fetchProducts() {
    fetch('/products')
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(products => {
            displayProducts(products, 'product-list');
        })
        .catch(error => {
            console.error('Fetch error:', error.message);
            displayError(error.message);
        });
}

function displayProducts(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous results
    products.forEach(product => {
        console.log(product._id);

        const productDiv = document.createElement('div');
        productDiv.className = 'product-item';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>By: ${product.author}</p>
            <p>Price: $${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
            <p class="availability ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                ${product.inStock ? 'In stock' : 'Sold out'}
            </p>
        `;

        // if the book is sold out
        if (product.inStock) {
            const addButton = document.createElement('button');
            addButton.textContent = 'ADD TO CART ';
            addButton.onclick = function() { addToUserList(product._id); };
            productDiv.appendChild(addButton);
        }

        container.appendChild(productDiv);
    });
}


function searchBooks() {
    const searchTerm = document.getElementById('search-box').value.toLowerCase();
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.author.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts, 'search-results');
        })
        .catch(error => {
            console.error('Error:', error);
            displayError(error.toString());
        });
}

const userList = [];

function addToUserList(id) {
    fetch(`/products/${id}`)
        .then(response => response.json())
        .then(product => {
            userList.push(product);
            localStorage.setItem('userList', JSON.stringify(userList));
            showMessage(`"${product.name}" has been added to your shopping cart.`); // Show a message to the user
        })
        .catch(error => {
            console.error('Error:', error);
            displayError(error.toString());
        });
}

function showMessage(message) {
    var popup = document.getElementById('notification-popup');
    var messageParagraph = document.getElementById('notification-message');
    messageParagraph.textContent = message;
    popup.style.display = 'block';    
    setTimeout(function() {
        popup.style.opacity = 1;
        setTimeout(function() {
            popup.style.opacity = 0;
            setTimeout(function() {
                popup.style.display = 'none';
            }, 500); 
        }, 3000);
    }, 10); 
}
