const client = require('../database');

const adminDatamapper = {
  // Get all orders
  async getAllOrders() {
    const renderAllOrders = {
      text: `SELECT
      "order"."id" AS "référence_commande" ,
      to_char(date_trunc('day',"order"."created_at"), 'DD/MM/YYYY') AS "date_de_création",
      "user"."firstname",
      "user"."lastname",
      "user"."email",
      "user"."phone",
      "address"."city",
      "address"."address",
      "address"."zip_code",
      array_to_string(array_agg("order_line"."quantity"::text), ',') AS "quantités",
      array_to_string(array_agg("order_line"."size"::text), ',') AS "tailles",
      array_to_string(array_agg("product"."title"), ',') AS "titres",
      array_to_string(array_agg("product".price::text), ',') AS "prix_unitaire",
      sum("product"."price"*"order_line"."quantity") AS "Montant_total"
    FROM "order"
    JOIN "user" ON "user"."id" = "order"."id_user"
    JOIN "address" ON "address"."id_user"="user"."id"
    JOIN "order_line" ON "order_line"."id_order" = "order"."id"
    JOIN "product" ON "order_line"."id_product" = "product"."id"
    GROUP BY "order"."id", "order"."created_at", "user"."firstname", "user"."lastname", "user"."email",
    "user"."phone", "address"."city", "address"."address", "address"."zip_code"
    ORDER BY "order"."created_at" DESC;`,
    };
    const result = await client.query(renderAllOrders);
    return result.rows;
  },
  // Get one order
  getOneOrderById: async (targetId) => {
    const preparedQuery = {
      text: `SELECT "order"."id" AS "référence_commande" ,
      to_char(date_trunc('day',"order"."created_at"), 'DD/MM/YYYY') AS "date_de_création",
      "order_line"."id" AS "référence_ligne_order",
      "product"."title",
     "product"."description" ,
      "product"."brand" ,
      "product"."price" AS "prix_unitaire" ,
      "product"."image" ,
      "order_line"."quantity" ,
      "order_line"."size",
      ("product"."price" * "order_line"."quantity") AS "montant_total_produit",
"user"."firstname",
      "user"."lastname",
      "user"."email",
      "user"."phone",
      "address"."city",
      "address"."address",
      "address"."zip_code"
FROM "order"
JOIN "user" ON "user"."id" = "order"."id_user"
    JOIN "address" ON "address"."id_user"="user"."id"
JOIN "order_line" ON "order"."id" = "order_line"."id_order"
JOIN "product" ON "order_line"."id_product" = "product"."id"
WHERE "order"."id" = $1;`,
      values: [targetId],
    };
    const result = await client.query(preparedQuery);
    // Return the order if it exists

    if (!result.rows.length) {
      return null;
    }
    // If the order does not exist
    return result.rows;
  },
  // Get one product
  getOneProductById: async (targetId) => {
    const preparedQuery = {
      text: 'SELECT * FROM "product" WHERE "id" = $1',
      values: [targetId],
    };
    const result = await client.query(preparedQuery);
    // Return the product if it exists
    if (result.rows.length === 1) {
      return result.rows[0];
    }
    // If the product does not exist
    return null;
  },

  // Hide one product
  async hide(product) {
    const query = {
      text: 'UPDATE "product" SET "hidden" = true WHERE id = $1 RETURNING *',
      values: [product.id],
    };
    const rows = await client.query(query);
    return rows[0];
  },

  // Create  product
  create: async (product) => {
    const createProduct = {
      text: `INSERT INTO product (title, description, brand, price, image)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id;`,
      values: [product.title, product.description, product.brand,
        product.price, product.image.toLowerCase()],
    };
    const idProduct = await client.query(createProduct);
    return idProduct;
  },

  // Update product
  updateProduct: async (productId, updatedProduct) => {
    const updateProduct = {
      text: `UPDATE product
         SET title = $1,
             description = $2,
             brand = $3,
             price = $4,
             image = $5
         WHERE id = $6
         RETURNING *;`,
      values: [updatedProduct.title,
        updatedProduct.description,
        updatedProduct.brand,
        updatedProduct.price,
        updatedProduct.image.toLowerCase(),
        productId],
    };
    const result = await client.query(updateProduct);
    return result.rows;
  },
};

module.exports = adminDatamapper;
