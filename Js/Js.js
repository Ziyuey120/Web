/*search bar*/
const searchBtn = document.getElementById("searchBtn");

const overlay = document.getElementById("searchOverlay");

const closeBtn = document.getElementById("closeSearch");

searchBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

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

    row.innerHTML += `
    <tr>
        <td>${item.name}</td>
        <td>$${item.price}</td>

        <td class="quantity-control">
        <button onclick="changeQuantity(${index},-1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${index},1)">+</button>
        </td>   

        <td>$${item.price * item.quantity}</td>

        <td>
            <button onclick="removeItem(${index})">Remove</button>
        </td>
    </tr>
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
function changeQuantity(index, change) {
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();
}

/*remove items*/
function removeItem(index) {
  cart.splice(index, 1);

  displayCart();
}

/*load cart*/
displayCart();
