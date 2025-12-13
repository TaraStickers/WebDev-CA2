var XML_URL = "food.xml";
let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {
  bookingForm();
  menuFilter();
  loadContent();
});

function loadContent(categoryFilter = "All") {
  var status = document.getElementById("status");
  var grid = document.getElementById("product-grid");
  if (!status || !grid) return;

  if (allProducts.length > 0) {
    renderProducts(categoryFilter);
    return;
  }
  status.textContent = "loading products...";
  fetch(XML_URL)
    .then((response) => response.text())
    .then((xmlText) => {
      var parser = new DOMParser();
      var xmlDOC = parser.parseFromString(xmlText, "application/xml");

      var products = xmlDOC.getElementsByTagName("product");

      allProducts = [];

      for (let i = 0; i < products.length; i++) {
        var product = products[i];
        var name = product.getElementsByTagName("name")[0].textContent;
        var description =
          product.getElementsByTagName("description")[0].textContent;
        var price = product.getElementsByTagName("price")[0].textContent;
        var image = product.getElementsByTagName("image")[0].textContent;
        var category = product.getElementsByTagName("category")[0].textContent;

        allProducts.push({ name, description, price, image, category });
      }
      renderProducts(categoryFilter);
    })

    .catch((error) => {
      status.textContent = "Error loading XML products.";
      console.error(error);
    });
}
function renderProducts(categoryFilter = "All") {
  var status = document.getElementById("status");
  var grid = document.getElementById("product-grid");
  if (!status || !grid) return;

  grid.innerHTML = "";

  let items = allProducts;
  if (categoryFilter && categoryFilter !== "All") {
    items = allProducts.filter(
      (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }
  status.textContent = "";
  items.forEach((p) => {
    var card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <img src="${p.image}" alt="${p.name}" class="product-image">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <p><strong>${p.price}</strong></p>
            `;
    grid.appendChild(card);
  });
}
function menuFilter() {
  var nav = document.querySelector(".nav-bar");
  if (!nav) return;

  nav.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() !== "li") return;

    var category = e.target.getAttribute("data-category") || "All";

    loadContent(category);
  });
}

function bookingForm() {
  var form = document.getElementById("reserve-form");
  var msg = document.getElementById("reserve-msg");

  if (!form || !msg) return;

  form.addEventListener("submit", function (e) {
    //e.preventDefault();

    var name = document.getElementById("name").value;
    var people = document.getElementById("people").value;
    var date = document.getElementById("date-book").value;
    var time = document.getElementById("time").value;
    var email = document.getElementById("email").value;

    if (!name || !people || !date || !time || !email) {
      msg.style.color = "#ffe5e5";
      msg.textContent = "Please fill in all the required fields.";
      return;
    }

    msg.style.color = "#e9ffef";
    msg.textContent =
      "Thank you! " +
      name +
      ", your booking has been received for " +
      date +
      " at " +
      time +
      ". You will receive an email confirmation, Enjoy!";

    form.reset();
  });
}
