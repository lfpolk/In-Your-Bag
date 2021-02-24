const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Get users bag
router.get("/", authorization, async(req, res) => {
    try {
    const user = await pool.query("SELECT * FROM users " +  
                                  "LEFT JOIN bag ON users.user_id = bag.user_id LEFT JOIN discs ON bag.disc_id = discs.disc_id " +
                                  "WHERE users.user_id = $1 ORDER BY type DESC",
                                   [req.user.id]
                                  );

    res.json(user.rows);

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
}
);

// Add disc to bag
router.post('/bag', authorization, async (req, res) => {
    try {
        const { disc_id, plastic } = req.body;

        console.log("INSERT INTO bag (disc_id, user_id, plastic) VALUES (" + disc_id + ",'" + req.user.id + "','" + plastic + "') RETURNING *");

        const newDisc = await pool.query(
            "INSERT INTO bag (disc_id, user_id, plastic) VALUES (" + disc_id + ",'" + req.user.id + "','" + plastic + "') RETURNING *"
        );

        res.json(newDisc.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all discs
router.get('/discs', async (req, res) => {
    try {
        const allDiscs = await pool.query("SELECT disc_id, mold, manufacturer FROM discs;")
        res.json(allDiscs.rows)
    } catch (err){
        console.error(err.message)
    }
});

// Remove disc from bag
router.delete("/bag/:id/:plastic", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        var { plastic } = req.params;

        if (plastic === 'empty'){
            plastic = ''
        }

        console.log("DELETE FROM bag WHERE disc_id = " + id + " AND plastic = '" + plastic +  "' AND user_ID = '" + req.user.id + "'");
        const deleteDisc = await pool.query("DELETE FROM bag WHERE disc_id = " + id + " AND plastic = '" + plastic +  "' AND user_ID = '" + req.user.id + "'");
        res.json("Disc was removed from bag");
    } catch (err) {
        console.error(err.message)
    }
});

module.exports = router;