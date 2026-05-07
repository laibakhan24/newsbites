require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;
const API_KEY = process.env.NEWS_API_KEY;
app.get("/api/news", async (req, res) => {
    try {
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 12;
        const country = req.query.country || "in";
        const category = req.query.category || "general";

        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        res.json(data);

    } catch (error) {
        res.status(500).json({
            error: "Something went wrong",
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});