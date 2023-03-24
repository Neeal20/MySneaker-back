const bcrypt = require('bcrypt');

async function cryptage() {
  const saltRound = 10;

  const myPassword = 'toto1234';

  const encryptedPassword = await bcrypt.hash(myPassword, saltRound);

  console.log(encryptedPassword);
}

cryptage();
