const { validationResult } = require('express-validator/check');
const { v4: uuidv4 } = require('uuid');
const { encrypt, decrypt } = require('../util/crypt');
const { convertToSecretDtoCollection } = require('../util/conversation');

const Secret = require('../models/secret');

exports.getSecret = (req, res, next) => {
  const hash = req.params.hash;
  Secret.find({hash: hash}).then(secrets => {
    const decryptedSecrets = convertToSecretDtoCollection(secrets);
    res.status(200).json({ message: 'Fetched secrets successfully.', secrets: decryptedSecrets });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.getSecrets = (req, res, next) => {
  Secret.find().then(secrets => {
    const decryptedSecrets = convertToSecretDtoCollection(secrets);
    res.status(200).json({ message: 'Fetched secrets successfully.', secrets: decryptedSecrets });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.createSecret = (req, res, next) => {
  const secret = new Secret({
    hash: uuidv4(),
    author: req.body.author,
    content: encrypt(req.body.content),
    expire: new Date(),
  });
  secret.save().then(result => {
      res.status(201).json({
        message: 'Secret created successfully!',
        secret: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
