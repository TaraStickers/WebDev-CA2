/*
CODE REFERENCE : HAMILTON CLASS NOTES
*/

//require express
const express = require("express");
//create the Express app
const app = express();
//require mongoose
const mongoose = require("mongoose");
const Booking = require("./models/Bookings");

//parse json from browser
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//instruction with the view engine to be userd
app.set("view engine", "ejs");

//connection to MongoDB database
const dbURI =
  "mongodb+srv://x24158216_db_user:Mydbpass123@wad.vqjnkwl.mongodb.net/WADBookingsDB?retryWrites=true&w=majority";
//show in terminal when connection starts on localhose adn with database
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MomgoDB connection failed:", error.message));

// index page
app.get("/", (req, res) => {
  res.render("index", { title: "PizzaCode Menu" });
});

//route to bookings page and find bookings
app.get("/bookings", (request, response) => {
  Booking.find()
    .sort({
      date: 1,   //earliest date first
      time: 1,
    })
    .then((result) =>
      response.render("bookings", {
        title: "Bookings and takeaway",
        bookings: result,
      })
    )
    .catch((error) => console.log(error));
});

//post bookings to db else log error
app.post("/bookings", (request, response) => {
  const booking = new Booking(request.body);

  booking
    .save()
    .then((result) => {
      response.redirect("/bookings");
    })
    .catch((error) => console.log(error));
});

//vouchers page 
app.get("/voucher", (req, res) => {
  res.render("voucher", { title: "Vouchers" });
});
