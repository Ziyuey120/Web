/*cart system*/
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  let product = cart.find((item) => item.name === name);

  if (product) {
    product.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();

  alert("Bouquet added to cart!'");
}

/*display items*/
function displayCart() {
  let cartItems = document.getElementById("cart-items");

  if (!cartItems) return;

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    let row = document.createElement("tr");

    let itemTotal = item.price * item.quantity;
    total += itemTotal;

    row.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price}</td>

        <td>
            <input type="number" min="1" value="${item.quantity}"
            onchange="updateQuantity(${index}, this.value)">
        </td>

        <td>$${itemTotal}</td>

        <td>
            <button onclick="removeItem(${index})">Remove</button>
        </td>
    `;

    cartItems.appendChild(row);
  });

  let totalElement = document.getElementById("cart-total");

  if (totalElement) {
    totalElement.innerText = "Total: $" + total;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

/*update quantity*/
function updateQuantity(index, quantity) {
  cart[index].quantity = parseInt(quantity);

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  displayCart();
}

/*remove items*/
function removeItem(index) {
  cart.splice(index, 1);

  displayCart();
}

/*load cart*/
displayCart();
