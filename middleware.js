const fs = require("fs");


const verifyAdmin = (req, res, next) => {
  const userInfo = fs.readFileSync("./db/users.json")
  const userDB = JSON.parse(userInfo)

  const apiKey = req.headers.api_key

  const selectedUser = userDB.find(user=>user.api_key == apiKey )

  if(selectedUser.user_type != "admin"){
    return res.status(403).json({
      message:"you are not authorized"
    })
    
  }
  next()
};

const verifyApiKey = (req, res, next) => {
  const userInfo = fs.readFileSync("./db/users.json");
  const userDB = JSON.parse(userInfo);

  const apiKey = req.headers.api_key;

  if (!apiKey) {
    return res.status(401).json({
      message: "you are not authenticated, api_key required",
    });
  }

  const selectedUser = userDB.find((user) => user.api_key === apiKey);
  if (!selectedUser) {
   return res.status(401).json({
      message: "you are not authenticated",
    });
  }
  next();
};

const verifyItem = (req, res, next) => {
  const items = ["Pig", "Beer"];
  if (items.includes(req.body.name)) {
    return res.status(406).json({
      error: "Items Pig or Beer not accepted",
    });
  }
  next();
};

module.exports = {
  verifyItem,
  verifyApiKey,
  verifyAdmin,
};
