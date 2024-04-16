require("dotenv").config();

const fileUpload = require("express-fileupload");
const express = require("express");
const route = require("./route");

const app = express();
const port = 4000;

app.use(express.json());
app.use(
    fileUpload({
        useTempFiles: true,
    })
);
app.use(express.static("public"));

app.use("/api", route);


app.use("*", (req, res) => {
    res.status(404).json({
        data: null,
        message: "Route not found",
    });
});

// Error middleware
app.use((err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";

    if (err.statusCode) {
        statusCode = err.statusCode;
    }
    if (err.message) {
        message = err.message;
    }

    res.status(statusCode).json({
        data: null,
        message,
    });
});

app.listen(port, () => console.log(`server running on port ${port}`));