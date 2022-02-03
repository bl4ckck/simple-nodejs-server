require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

const api = require("./routes");

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/views"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", {
        page: "home",
        props: {}
    });
});
app.get("/article/:id", (req, res) => {
    res.render("index", {
        page: "detailArticle",
        props: {
            id: req.params.id,
            isProduct: true
        }
    });
});
app.get("/product", (req, res) => {
    res.render("index", {
        page: "product",
        props: {
            isProduct: true
        },
    });
});

app.use("/api/v1", api);

const port = process.env.PORT;
app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
});

module.exports = app;
