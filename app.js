const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Meme = require("./models/meme");
const { SSL_OP_TLS_BLOCK_PADDING_BUG } = require("constants");
const { render } = require("ejs");

const app = express();

// mongodb
const dbURI = "mongodb+srv://vanari:XjoTLRTNP5yLKWWa@chadposting.wfvpp.mongodb.net/chadposting?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))

// ejs
app.set("view engine", "ejs");

// middleware
app.use(express.static(("public")));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// moongose
/* app.get("/add-meme", (req, res) => {
    const meme = new Meme({
        name: "memik2",
        meme: "pepe"
    });

    meme.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.get("/all-memes", (req, res) => {
    Meme.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get("/single-meme", (req, res) => {
    Meme.findById("5f33b57e2742ace2a5c94a94")
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
}); */

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

// meme page

app.get("/memes/new", (req, res) => {
    res.render("new", { title: "New meme" });
});

app.get("/memes", (req, res) => {
    Meme.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render("memes", { title: "Memes" , memes: result });
        })
        .catch((err) => {
            console.log(err)
        });
});

app.post("/memes", (req, res) => {
    const meme = new Meme(req.body);

    meme.save()
        .then((result) => {
            res.redirect("/memes");
        })
        .catch((err) => {
            console.log(err);
        });
});

app.delete("/memes/:id", (req, res) => {
    const id = req.params.id;

    Meme.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: "/memes" });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get("/memes/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    Meme.findById(id)
        .then((result) => {
            res.render('details', { meme: result, title: result.name })
        })
        .catch((err) => {
            console.log(err);
        });
});

// 404
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});