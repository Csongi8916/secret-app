const { decrypt } = require('../util/crypt');

const convertToSecretDtoCollection = (secrets) => {
  return secrets.map(secret => {
    return convertToSecretDto(secret);
  });
}

const convertToSecretDto = (secret) => {
  return {
      hash: secret.hash,
      author: secret.author,
      content: decrypt(secret.content),
      isExpired: secret.expire >= new Date().getDate()
  }
}

module.exports = {
  convertToSecretDtoCollection,
  convertToSecretDto,
};