import jwt from 'jsonwebtoken';

export default authMiddleware {

    function auth(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
      
        if (!token) {
            return res.status(401).json({ message: 'Accès refusé, token manquant' });
        } 

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
          if (err) {
            return res.sendStatus(401)
          }
          req.user = user;
          next();
        });
      }
}


  app.get('/api/me', authenticateToken, (req, res) => {
    res.send(req.user);
  });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajoute les informations du token à l'objet req
    next(); // Passe au middleware ou route suivante
} catch (error) {
    res.status(401).json({ message: 'Token invalide ou expiré' });
}


};

export default authenticate;