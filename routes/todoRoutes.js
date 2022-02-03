const express = require("express");
const router = express.Router();

let data = [
    {
        todo: "todo Task 1",
        descriptions: "Description 1",
    },
    {
        todo: "todo Task 2",
        descriptions: "Description 2",
    },
    {
        todo: "todo Task 3",
        descriptions: "Description 3",
    },
];

/*
 * GET
 */
router.get("/", (req, res) => {
    res.status(200).json({
        message: "GET request to /todo",
        data: data,
    });
});

/*
 * GET
 */
router.get("/:id", (req, res) => {
    const { id } = req.params;

    res.status(200).json({
        message: "GET request to /todo/:id",
        data: data[id - 1],
    });
});

/*
 * POST
 */
router.post("/", (req, res) => {
    const { todo, descriptions } = req.body;

    data.unshift({ todo, descriptions });

    res.status(200).json({
        message: "POST request to /todo",
        data: {
            todo,
            descriptions,
        },
    });
});

/*
 * PUT
 */
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { todo, descriptions } = req.body;

    data[id - 1] = { todo, descriptions };

    res.status(200).json({
        message: "PUT request to /todo/:id",
        data: {
            todo,
            descriptions,
        },
    });
});

module.exports = router;
