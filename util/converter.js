const { decrypt } = require('./crypt');
const { formatDate } = require('./date');

const convertToSecretDtoCollection = (secrets) => {
  if (!secrets || secrets.length === 0) return [];
  
  return secrets.map(secret => {
    return convertToSecretDto(secret);
  });
}

const convertToSecretDto = (secret) => {
  return {
      hash: secret.hash,
      secretText: decrypt(secret.secretText),
      expiresAt: formatDate(secret.expiresAt),
      createAt: formatDate(secret.createdAt),
      remainingViews: secret.remainingViews
  }
}

module.exports = {
  convertToSecretDtoCollection,
  convertToSecretDto,
};