require('dotenv').config();
const jwt = require('jsonwebtoken');
const userDatamapper = require('../../models/datamappers/userDatamapper');
const userServices = require('../../services/userServices');

const userController = {
  // méthode qui permet de vérifier si l'user est bien dans la bdd
  login: async (req, res) => {
    try {
      // je récupère l'email et le mot de passe qui a était envoyé
      const { email, password } = req.body;
      // je demande a l'userService de chexk les info reçu
      const user = await userServices.CheckUser(email, password);
      // si une l'utilisateur n'existe pas dans la bdd une erreur est envoyé
      if (user === 401) {
        return res.status(401).send('Le nom d\'utilisateur ou le mot de passe ne correspondent pas');
      }
      // si l'utilisateur a renseigné une adress email invalide un message d'erreur est renvoyé
      if (user === 400) {
        return res.status(400).send('Le format de l\'email n\'est pas correct');
      }
      if (user === 402) {
        return res.status(401).send('Votre compte est désactivé');
      }
      // si tout est correcte on créer un token jwt
      const token = jwt.sign({
        id: user.id,
        id_role: user.id_role,
      }, process.env.SECRET_JWT, { expiresIn: '1h' });
      // on renvoie les infos de l'user non sensible en clair et le token jwt
      res.json({
        email: user.email,
        phone: user.phone,
        firstname: user.firstname,
        lastname: user.lastname,
        address: user.address,
        zip_code: user.zip_code,
        city: user.city,
        id_role: user.id_role,
        token,
      });
    } catch (error) {
      // si la bdd ne répond pas on renvoie une erreur
      console.error(error);
      res.status(500).send(error);
    }
  },
  // méthode pour création utilisateur
  signup: async (req, res) => {
    try {
      // je récupère les infos envoyé par le front
      const newUser = req.body;
      // j'envoie les infos a l'userService pour qu'il les controle
      const result = await userServices.CheckUserAndAdd(newUser);
      if (result === 200) {
        // si tous c'est bien passé je renvoie un code 200 avec un message
        res.status(200).send('L\'utilisateur est bien enregistré');
      } else {
        // si des information sont incorrects je renvoie un code 400 avec un message
        res.status(400).send('Les données saisie sont incorrect');
      }
      // si la bdd ne répond pas ou que les données saisie ne peuvent pas etre rentré dans la bdd
      // alors je renvoie un code 500 avec le log de l'erreur
    } catch (error) {
      res.status(500).send(error);
    }
  },
  // méthode pour modifier le profil
  modify: async (req, res) => {
    // récupération des infos de modification de l'user
    const user = req.body;
    // récupération de l'id de l'user
    const idUser = req.user.id;
    const result = userServices.modifyUser(user, idUser);
    if (result === 404) {
      res.status(404).send('L\'utilisateur n\'existe pas');
    }
    if (result === 400) {
      res.status(400).send('Les données saisies sont incorrectes');
    }
    res.send('test ok');
  },
  // méthode pour supprimer un user de la bdd
  delete: async (req, res) => {
    const idUser = req.user.id;
    try {
      const result = userServices.delete(idUser);
      if (result === 400) {
        res.status(400).send('Impossible de supprimer l\'utilisateur');
      }
      res.status(200).send('L\'utilisateur est bien supprimer');
    } catch (error) {
      res.status(500).send(error);
    }
  },
  // méthode pour supprimer un user (non définitif / seulement hidden = true)
  hideUser: async (req, res) => {
    const idUser = req.user.id;
    try {
      const result = await userDatamapper.hiddenUser(idUser);
      if (result === 400) {
        res.status(400).send('Impossible de supprimer l\'utilisateur');
      }
      res.status(200).send('L\'utilisateur est bien supprimer');
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = userController;
