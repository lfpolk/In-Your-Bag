const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {

    try {
        // destructure token
        const jwtToken = req.header("token");

        if(!jwtToken) {
            res.status(403).json("Not authorized");
        }

        const verify = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = verify.user;
        next();


    } catch (error) {
        //console.error(error.message);
        return res.status(403).json("Not authorized")
    }

}