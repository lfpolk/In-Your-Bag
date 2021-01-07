module.exports = function(req, res, next) {
    const { username, name, password } = req.body;
  
    function validUsername(userUsername) {
      return /^[0-9a-zA-Z]+$/.test(username);
    }
  
    if (req.path === "/register") {
      console.log(!username.length);
      if (![username, name, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validUsername(username)) {
        return res.json("Username must only contain numbers and letters");
      }
    } else if (req.path === "/login") {
      if (![username, password].every(Boolean)) {
        return res.json("Missing Credentials");
      } else if (!validUsername(username)) {
        return res.json("Invalid username");
      }
    }
  
    next();
  };