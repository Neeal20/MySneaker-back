const productDatamapper = require('../../models/datamappers/productDatamapper');

const productController = {
  // get all product
  async getAllProducts(req, res) {
    try {
      // je demande au datamapper de me récupérer tous les produit de la bdd
      const allProducts = await productDatamapper.getAllProducts();
      // si je les récupère je les renvoie
      res.json(allProducts);
      // sinon je renvoie le message d'erreur
    } catch (error) {
      res.status(500).send(error);
    }
  },
  // Get one product
  async productDetails(req, res) {
    try {
      // je récupère l'id du produit demandé
      const targetId = req.params.id;
      // je demande au datamapper de me rechercher le produit concerner
      const foundProduct = await productDatamapper.getOneProductById(targetId);
      // si il y en a pas je renvoie un code 404 ainsi qu'un message
      if (!foundProduct) {
        res.status(404).send('Le produit n\'existe pas!');
      }
      // sinon je renvoie la fiche produit
      res.json(foundProduct);
      // si une erreur se produit je renvoie le message d'erreur
    } catch (error) {
      res.status(500).send(error);
    }
  },

};

module.exports = productController;
