/*
CODE REFERENCE : HAMILTON CLASS NOTES
*/
const express = require("express");
const mongoose = require("mongoose");
const Booking = require("./models/BookingsWADCA2");

//create the Express app
const app = express();

//parse json from browser
app.use(express.json());
//middleware to allow access to static files
app.use(express.static("public"));
//instruction with the view engine to be userd
app.set("view engine", "ejs");

//connection to MongoDB database
const dbURI = "mongodb+srv://x24158216_db_user:Wk0PK16Y3rJlum@wad.vqjnkwl.mongodb.net/WADBookingsDB?retryWrites=true&w=majority";

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

app.get("/contact", (request, response) => {
    response.render("contact", {
        title: "Contact"
    });
});

//redirect
app.get("/contactme", (request, response) => {
    response.redirect("/contact");
});

//404 page
app.use((request, response) => {
    response.status(404).render("404", {
        title: "Error"
    });
});