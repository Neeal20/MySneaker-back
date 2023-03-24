const adminDatamapper = require('../../models/datamappers/adminDatamapper');
const productDatamapper = require('../../models/datamappers/productDatamapper');

const adminController = {

  // Hide one product
  async hideProduct(req, res) {
    // je récupère l'id du produit que je veux modifier
    const targetId = Number(req.params.id);
    try {
      // je récupère le produit en fonction de son id
      const product = await productDatamapper.getOneProductById(targetId);

      // s'il n'existe pas je renvoie un code 404
      if (!product) {
        res.status(404).json({ error: `Product with ID ${targetId} not found` });
      }
      // je check si le produit est hidden si oui, je renvoie un code 400
      if (product.hidden) {
        res.status(400).json({ error: `Product with ID ${targetId} is already hidden` });
      }
      // sinon je demande au datamapper de le caché
      const updatedProduct = await adminDatamapper.hide(product);
      // et je renvoie la fiche produit
      res.json(updatedProduct);
      // si j'ai une erreur, je renvoie un code 500 avec l'erreur
    } catch (error) {
      res.status(500).send(error);
    }
  },
  // Create product
  createProduct: async (req, res) => {
    try {
      const product = req.body;
      const createdProduct = await adminDatamapper.create(product);
      res.status(201).json(createdProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create product' });
    }
  },
  // Update a product
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const updatedProduct = req.body;

      const result = await adminDatamapper.updateProduct(productId, updatedProduct);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating product' });
    }
  },
  // Get all oders
  getAllOrder: async (req, res) => {
    try {
      const result = await adminDatamapper.getAllOrders();
      if (!result) {
        res.status(404).send('aucune commande trouvé');
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Get one order
  async getOneOrder(req, res) {
    try {
      // je récupère l'id de la commande
      const targetId = req.params.id;
      // je demande au datamapper de me rechercher la commande
      const foundOrder = await adminDatamapper.getOneOrderById(targetId);
      // si il y en a pas je renvoie un code 404 ainsi qu'un message
      if (!foundOrder) {
        return res.status(404).send('La commande n\'existe pas!');
      }
      // sinon je renvoie la fiche order
      return res.json(foundOrder);
      // si une erreur se produit je renvoie le message d'erreur
    } catch (error) {
      return res.status(500).send(error);
    }
  },
};

module.exports = adminController;
