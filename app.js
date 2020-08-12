const express = require("express");

const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname));

app.listen(3000);

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/index", (req, res) => {
    res.redirect("/");
});

app.get("/based", (req, res) => {
    res.render("based", { title: "Based" });
});

app.get("/about", (req, res) => {
    res.redirect("based");
});

app.get("/memes", (req, res) => {
    res.render("memes", { title: "Memes" });
});

app.get("/memes/new", (req, res) => {
    res.render("new", { title: "New meme" });
});

app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});