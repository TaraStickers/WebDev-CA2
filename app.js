/*
CODE REFERENCE : HAMILTON CLASS NOTES
*/
const express = require("express");
const mongoose = require("mongoose");
const Booking = require("./models/Bookings");


//create the Express app
const app = express();

//parse json from browser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware to allow access to static files
app.use(express.static("public"));
//instruction with the view engine to be userd
app.set("view engine", "ejs");

//connection to MongoDB database
const dbURI = "mongodb+srv://x24158216_db_user:Mydbpass123@wad.vqjnkwl.mongodb.net/WADBookingsDB?retryWrites=true&w=majority";

mongoose.connect(dbURI)

    .then((result) => app.listen(3000))
    .catch((error) => console.log(error));


//route and response
app.get("/", (request, response) => {
    Booking.find().sort({
            createdAt: -1
        })
        .then((result) => response.render("bookings", {
            title: "Bookings",
            bookings: result
        }))
        .catch((error) => console.log(error));
});

app.post("/bookings", (request, response) => {
  const booking = new Booking(request.body);

  booking.save()
    .then(() => {
      response.redirect("/");
    })
    .catch(error => console.log(error));
});

