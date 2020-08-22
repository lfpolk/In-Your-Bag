const Pool = require("pg").Pool;

const pool = new Pool({
    user: "larsonpolk",
    password: "dukey",
    host: "localhost",
    port: 5432,
    database: 'in_your_bag'
})

module.exports = pool;