const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path")
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

//process.ev.PORT
//process.env.NODE_ENV =? production or undefined

// app.use(express.static(path.join(__dirname, "client/build")));
//app.use(express.static("client/build"))
console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production'){
    // serve static content
    // npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
}
// Register

console.log(__dirname)
 
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard

app.use("/dashboard", require("./routes/dashboard"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
});

// Run Server
app.listen(PORT, () => {
    console.log(`Server is running on port PORT ${PORT}`);
});