const pool = require('../database');

const userDatamapper = {

  // search for a user by email address
  async getOneUser(email) {
    const preparedQuerry = {
      text: `SELECT 
      "user"."id",
      "user"."email",
      "user"."id_role",
      "user"."password",
      "user"."phone",
      "user"."firstname",
      "user"."lastname", 
      "user"."hidden",
      "address"."address",
      "address"."zip_code",
      "address"."city"
      FROM "user"
      JOIN "address" ON "address"."id_user" = "user"."id"
      WHERE "user"."email" = $1`,
      values: [email],
    };
    // I send the querry to the database file
    const result = await pool.query(preparedQuerry);
    // returns the first value
    return result.rows[0];
  },
  async putOneUser(user, password) {
    // insert a user in the DB
    const preparedQuerry = {
      text: `INSERT INTO "user"(
        "email",
        "password",
        "phone",
        "firstname",
        "lastname")
        VALUES
      ($1,$2,$3,$4,$5)
      RETURNING id;`,
      values: [user.email.toLowerCase(), password, user.phone, user.firstname, user.lastname],
    };
    // the database returns the ID of the created user
    const result = await pool.query(preparedQuerry);
    return result.rows[0];
  },

  async addAddressFromUserId(address, idUser) {
    // create an address based on a user_id
    const preparedQuerry = {
      text: `INSERT INTO "address" 
      ("address", "zip_code", "city", "id_user")
       VALUES 
       ($1,$2,$3,$4);`,
      values: [address.address, address.zip_code, address.city, idUser],
    };
    // send request to the database
    await pool.query(preparedQuerry);
    // if ok return a code: 200
    return 200;
  },
  //  modify a user
  async updateUser(user, idUser, password) {
    const preparedQuerry = {
      text: `UPDATE "user" SET
      "firstname" = $1,
      "lastname"= $2,
      "phone"=$3,
      "password" = $4
      Where "id"=$5`,
      values: [user.firstname, user.lastname, user.phone, password, idUser],
    };
    await pool.query(preparedQuerry);
    return 200;
  },
  async updateUserWithoutPassword(user, idUser) {
    const preparedQuerry = {
      text: `UPDATE "user" SET
      "firstname" = $1,
      "lastname"= $2,
      "phone"= $3
      WHERE "id"=$4`,
      values: [user.firstname, user.lastname, user.phone, idUser],
    };
    await pool.query(preparedQuerry);
    return 200;
  },
  async updateAddress(idUser, user) {
    const preparedQuerry = {
      text: `UPDATE "address" SET
      "address" = $1,
      "zip_code"= $2,
      "city"= $3
      WHERE "id_user" = $4 `,
      values: [user.address, user.zip_code, user.city, idUser],
    };
    await pool.query(preparedQuerry);
    return 200;
  },
  async deleteUser(idUser) {
    const preparedQuerry = {
      text: 'DELETE FROM "user" WHERE "id"= $1',
      values: [idUser],
    };
    await pool.query(preparedQuerry);
    return 200;
  },
  async hiddenUser(idUser) {
    const preparedQuerry = {
      text: 'UPDATE "user" SET "hidden" = true WHERE id = $1',
      values: [idUser],
    };
    await pool.query(preparedQuerry);
    return 200;
  },

};

module.exports = userDatamapper;
