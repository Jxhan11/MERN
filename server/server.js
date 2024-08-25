require("dotenv").config();
const express = require("express");
const cors = require("cors"); // Import the cors middleware
const app = express();
const router = require("./router/auth-router");
const PORT = 5000;
app.use(express.json());
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const allowedOrigins = [
    "https://bajaj-test-nine.vercel.app", // Add your frontend URL here
    "http://localhost:3000", // Allow localhost for development
];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true); // Allow the origin
            } else {
                callback(new Error("Not allowed by CORS")); // Reject the origin
            }
        },
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
    })
);

// Mock user data
const user = {
    user_id: "johan_eapen_16052003",
    email: "georgeeapen512@gmail.com",
    roll_number: "21BAI1181",
};

// POST endpoint to process data
app.post("/bfhl", (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Invalid data format. Expected an array.",
        });
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
    const lowercaseAlphabets = alphabets.filter(
        (item) => item === item.toLowerCase()
    );
    const highestLowercaseAlphabet =
        lowercaseAlphabets.length > 0
            ? [
                  String.fromCharCode(
                      Math.max(
                          ...lowercaseAlphabets.map((char) =>
                              char.charCodeAt(0)
                          )
                      )
                  ),
              ]
            : [];

    res.json({
        is_success: true,
        user_id: user.user_id,
        email: user.email,
        roll_number: user.roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
    });
});

// GET endpoint for status
app.get("/bfhl", (req, res) => {
    res.json({
        operation_code: "1",
    });
});

app.use("/api/auth/", router);
app.use(errorMiddleware);
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port:${PORT}`);
    });
});
