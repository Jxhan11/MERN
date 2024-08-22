require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const PORT = 5000;
app.use(express.json());
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

app.use("/api/auth/", router);
app.use(errorMiddleware);
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port:${PORT}`);
    });
});
