//load xml and make all products for storage later
var XML_URL = "/food.xml";
let allProducts = [];

//run functions after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  bookingForm();
  menuFilter();
  loadContent();
});

//load menu items from xml, parses and store
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
      //fill all products container with each item
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
    //catch error
    .catch((error) => {
      status.textContent = "Error loading XML products.";
      console.error(error);
    });
}

//display menu iteem
function renderProducts(categoryFilter = "All") {
  var status = document.getElementById("status");
  var grid = document.getElementById("product-grid");
  if (!status || !grid) return;

  grid.innerHTML = "";

  let items = allProducts;
  //show selected category of items
  if (categoryFilter && categoryFilter !== "All") {
    items = allProducts.filter(
      (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
    );
  }
  status.textContent = "";
  //for each item display as so
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

//change category of menu 
function menuFilter() {
  var nav = document.querySelector(".nav-bar");
  if (!nav) return;

  nav.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() !== "li") return;

    var category = e.target.getAttribute("data-category") || "All";

    loadContent(category);
  });
}

//booking confirmation message
function bookingForm() {
  var form = document.getElementById("reserve-form");
  var msg = document.getElementById("reserve-msg");

  if (!form || !msg) return;

  form.addEventListener("submit", function (e) {
    //e.preventDefault();

    msg.style.color = "#e9ffef";
    msg.textContent =
      "Thank you! " +
      name +
      ", your booking has been received for " +
      date +
      " at " +
      time +
      ". You will receive an email confirmation, Enjoy!";
  });
}
  //check for delivery inputs and notify user if fields blank or if delivery request successful 
  function takeawayForm() {
    var takeawayBtn = document.getElementById("takeawayBtn");
    var takeawayMessage = document.getElementById("takeawayMsg");
    var addressInput = document.getElementById("home-delivery");
    var phoneInput = document.getElementById("contact-info");
    var orderInput = document.getElementById("order-info");
    var drinksInput = document.getElementById("drinks-info");


    if (!takeawayBtn) return;

    takeawayBtn.addEventListener("click", () => {

      var address = addressInput.value.trim();
      var phone = phoneInput.value.trim();
      var order = orderInput.value.trim();
      var drinks = drinksInput.value.trim();

      if (!address || !phone || !order || !drinks) {
        takeawayMessage.style.color = "#ce0000ff";
        takeawayMessage.textContent = "Please fill in the required fields.";
        return;
      }

      takeawayMessage.style.color = "#263028ff";
      takeawayMessage.innerHTML = "Thank you! Your takeaway order has been received. " + "We’ll have it ready shortly." + "<br>Please have cash ready for the driver!";
    });
  }

//voucher form submission, validation of inputs and confirmation message
function voucherForm() {
  var form = document.getElementById("voucher-form");
  var msg = document.getElementById("voucher-msg");

  if (!form || !msg) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    var amount = document.getElementById("voucher-amnt").value;
    var receiver = document.getElementById("to").value.trim();
    var receiverEmail = document.getElementById("mailto").value.trim();
    var sender = document.getElementById("from").value.trim();

    if (!amount || !receiver || !receiverEmail || !sender) {
      msg.style.color = "#080707ff";
      msg.textContent = "Please fill in required fields.";
      return;
    }
    msg.style.color = "#080707ff";
    msg.textContent = `Thank you ${sender}, your voucher order for ${receiver}, amount €${amount} has been sent to ${receiverEmail}`;
    form.reset();
  });
}
voucherForm();
