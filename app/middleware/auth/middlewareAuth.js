/* eslint-disable max-len */
require('dotenv').config();
const jwt = require('jsonwebtoken');

const middlewareAuth = {

  // middleware qui permet de savoir si un user est déjà connecté au site
  isLogged(req, res, next) {
    // on récupère le token jwt que le front nous renvoie
    const authHeader = req.headers.authorization;
    // si un token existe
    if (authHeader) {
      // je récupère uniquement de le token
      const token = authHeader.split(' ')[1];
      try {
        // je décode le token en fonction avec la clé secrete je stock tous et passe au middlware suivant
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        req.user = decoded;
        next();
      } catch (err) {
        // si le token a été modifier ou corrumpu alors je renvoie une erreur et la requète s'arrete la
        res.status(401).json({ error: 'Token invalide' });
      }
    } else {
      // si il y a pas de token je renvoie une erreur et la requête s'arrete la
      res.status(401).json({ error: 'Token manquant' });
    }
  },

  isAdmin(req, res, next) {
    // sinon l'id est autre que 1 cela veux dire que l'user n'est pas admin
    const idRole = req.user.id_role;
    if (idRole === 1) {
      next();
    } else {
      res.status(401).send('vous n\'avez pas les droits de réaliser cette action');
    }
  },
};

module.exports = middlewareAuth;
