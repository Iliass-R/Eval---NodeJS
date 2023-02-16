const jwt = require('jsonwebtoken');
const logger = require('../events/logger');

module.exports = (req, res, next) => {
 try {
     const token = req.headers.authorization.split(' ')[1];
     const secretKey = 'SR1wKQYqlTLVWZSlYkot3xTu0qdZuWDn'
     if (!token) {
       return res.status(401).json({ message: 'Aucun token fourni.' });
     }
   
     const decoded = jwt.verify(token, secretKey);
     if (!decoded) {
       return res.status(401).json({ message: 'Token invalide.' });
     }
   
     const compteId = decoded.compteID;

     req.auth = {
         compteId: compteId,
     }
     next();
 } catch (error) {
    res.status(401).json({error});
 }
}

