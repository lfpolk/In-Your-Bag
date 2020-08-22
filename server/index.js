const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Routes

// Register

app.use("/auth", require("./routes/jwtAuth"));

// Dashboard

app.use("/dashboard", require("./routes/dashboard"));

// Run Server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});