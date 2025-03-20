const jwt = require("jsonwebtoken")
require("dotenv").config()

// function validateToken (req, res, next) {
//     const accessToken = req.headers["authorization"].substring(7) ;
//     if(!accessToken) res.send("Access denied");
//     jwt.verify(accessToken, process.env.SECRET, (err, user) => {
//       if(err){
//         res.send("access denied, token expered or incorrect")
//       } else {
//         next()
//       }
//     })
//   }

  function validateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. Token missing or invalid." });
    }
  
    const accessToken = authHeader.substring(7); // Extraer el token después de "Bearer "
    jwt.verify(accessToken, process.env.SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Access denied. Token expired or invalid." });
      }
      req.user = user; // Almacenar los datos del usuario decodificados en la solicitud
      next();
    });
  }



module.exports = validateToken
