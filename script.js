const body = document.querySelector("body");
const carts = document.querySelector(".cart-container");
const quantity = document.querySelector("#quantity");

// minusBtn.addEventListener("click", handleMinus);
window.addEventListener("load", setCarts);

let items = [
  {
    id: 1,
    name: "Quality sneakers",
    price: "10,000",
    image: "shoe 1.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Italian bag",
    price: "50,000",
    image: "Bag.png",
    quantity: 1,
  },
  {
    id: 3,
    name: "Double-Knit Jacquard Ball cap",
    price: "37,000",
    image: "face cap.png",
    quantity: 1,
  },
  {
    id: 4,
    name: "Quamer Executive",
    price: "50,000",
    image: "Wrist watch.jpeg",
    quantity: 1,
  },
];

function setCarts() {
  items.map((item, i) => {
    const output = `
    <section>
    <div class="cart-product-container">
    <div class='head'>
    <h5 class="cart-product-container-title">Cart</h5>
    <button onclick='handleFav(${i})' id='heart' class='heart'>
    <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
    </div>
      <div class="cart-product">
        <div class="cart-content">
        <div class='img'>
          <img src="./images/${item.image}" alt="shoe" />
          </div>
          <div class="details">
            <p>${item.name}</p>
            <p class="small">Seller: Jumia</p>
          </div>
        </div>
        <div class="money">
          <p># ${item.price}</p>
          <div class="per">
            <span>N 15,000</span>
            <h3>-43%</h3>
          </div>
        </div>
        <div></div>
      </div>
      <div class="btn">
        <button onclick="handleRemove(${i})" class="rem">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
          <span>REMOVE</span>
        </button>
        <div class="num">
          <button onclick="handleMinus(${i})"><i class="fa fa-minus" aria-hidden="true"></i></button>
          <span id='quantity-${i}'> ${item.quantity} </span>

          <button onclick="handlePlus(${i})">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
    `;
    carts.innerHTML += output;
  });

  const totalQuantity = calculateTotalQuantity();

  let naira = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NIG",
    minimumFractionDigits: 0,
  }).format(totalQuantity);

  // Display total quantity in the DOM (replace 'total-quantity' with the appropriate element ID or class)
  const totalQuantityElement = document.getElementById("total-quantity");
  const subQuantityElement = document.getElementById("sub-quantity");
  if (totalQuantityElement || subQuantityElement) {
    totalQuantityElement.textContent = `N ${naira.split(/\s/)[1]}`;
    subQuantityElement.textContent = naira.split(/\s/)[1];
  }
}

function handleMinus(i) {
  items.map((item, index) => {
    if (i === index) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        // item.quantity = item.quantity - 1
        updateQuantityInDOM(i, item.quantity);
      }
    }
  });
}

function handlePlus(i) {
  items.map((item, index) => {
    if (i === index) {
      item.quantity += 1;
      // item.quantity = item.quantity + 1
      updateQuantityInDOM(i, item.quantity);
    }
  });
}

function updateQuantityInDOM(index, newQuantity) {
  const quantityElement = document.getElementById(`quantity-${index}`);
  if (quantityElement) {
    quantityElement.textContent = newQuantity;

    const totalQuantity = calculateTotalQuantity();

    let naira = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NIG",
      minimumFractionDigits: 0,
    }).format(totalQuantity);

    // Display total quantity in the DOM (replace 'total-quantity' with the appropriate element ID or class)
    const totalQuantityElement = document.getElementById("total-quantity");
    const subQuantityElement = document.getElementById("sub-quantity");

    if (totalQuantityElement) {
      totalQuantityElement.textContent = `N ${naira.split(/\s/)[1]}`;
      subQuantityElement.textContent = naira.split(/\s/)[1];
    }
  }
}

function handleRemove(i) {
  items = items.filter((_, index) => index !== i);

  carts.innerHTML = "";

  setCarts();
}

function handleFav(i) {
  const heartButtons = document.querySelectorAll(".heart");
  heartButtons[i].classList.toggle("red");
}

function calculateTotalQuantity() {
  let totalPrice = 0;

  items.forEach((item) => {
    totalPrice += parseFloat(item.price.replace(",", "")) * item.quantity;
  });

  return totalPrice;
}
