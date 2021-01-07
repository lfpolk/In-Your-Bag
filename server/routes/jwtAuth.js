const router = require("express").Router()
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");


// register route
router.post("/register", validInfo, async (req, res) => {
    try {
        // Destructure req.body

        const { name, username, password } = req.body;

        // Check if user exists (If exist: error)

        const user = await pool.query(
            "SELECT * FROM users WHERE user_username = $1", 
            [username]
            );

        if(user.rows.length !== 0) {
            return res.status(401).json("An account with that username has already been created");
        }

        // Bcrypt password

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);


        // Enter user into database

        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_username, user_password) VALUES ($1, $2, $3) RETURNING *", 
            [name, username, bcryptPassword]
            );

        // Generate JWT token

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})

// login route

router.post("/login", validInfo, async (req, res) => {
    try {
        
        // destructure req.body

        const { username, password } = req.body;

        // Check if user exists

        const user = await pool.query(
            "SELECT * FROM users WHERE user_username = $1",
            [username]
        );

        if (user.rows.length === 0){
            return res.status(401).json("Password or username is incorrect");
        }

        // Check if password matches database

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword){
            return res.status(401).json("Password or usernname is incorrect");
        }
        // Give user JWT token

        const token = jwtGenerator(user.rows[0].user_id)

        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error")
    }
    });

    // Verify user 
    
    router.get("/is-verify", authorization, async (req, res) => {
        try {
            res.json(true);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error")
        }
    });



module.exports = router;