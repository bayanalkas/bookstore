document.addEventListener('DOMContentLoaded', function() {
    displayUserBookList();
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', handleCheckout);
    }
});

function removeFromList(index) {
    let userList = JSON.parse(localStorage.getItem('userList')) || [];
    let removedItem = userList.splice(index, 1)[0]; // Capture the removed item

    localStorage.setItem('userList', JSON.stringify(userList));

    displayUserBookList();
    showMessage(`"${removedItem.name}" has been deleted from your shopping cart.`);
}



function displayUserBookList() {
    const userListContainer = document.getElementById('book-list-container');
    let userList = JSON.parse(localStorage.getItem('userList')) || [];
    let total = 0; // Initialize the total cost of the books

    if (userList.length === 0) {
        userListContainer.innerHTML = '<p>YOUR CART IS EMPTY.</p>';
    } else {
        // Clear the container
        userListContainer.innerHTML = '';

        // Iterate over the user list and create product items
        userList.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button onclick="removeFromList(${index})">DELETE</button>
            `;
            userListContainer.appendChild(productDiv);

            // Add the price of the current book to the total
            total += product.price;
        });

        total = total.toFixed(2);

        const totalDiv = document.createElement('div');
        totalDiv.className = 'total';
        totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
        userListContainer.appendChild(totalDiv);

        if (!document.getElementById('checkout-button')) {
            const checkoutButton = document.createElement('button');
            checkoutButton.id = 'checkout-button';
            checkoutButton.textContent = 'Checkout';
            checkoutButton.addEventListener('click', handleCheckout);
            userListContainer.appendChild(checkoutButton); // Append the button to the container
        }
    }
}



function handleCheckout() {
    localStorage.setItem('userList', JSON.stringify([])); // Clear the cart
    displayUserBookList();
    showMessage('Thank you for your purchase!');
}

function showMessage(message) {
    var popup = document.getElementById('notification-popup');
    var messageParagraph = document.getElementById('notification-message');  
    messageParagraph.textContent = message;
    popup.style.visibility = 'visible';
    popup.style.opacity = 1;
    popup.style.display = 'block';    
    setTimeout(function() {
        popup.style.opacity = 0;
        popup.style.visibility = 'hidden';
        setTimeout(function() {
            popup.style.display = 'none';
        }, 500);
    }, 3000);
}
