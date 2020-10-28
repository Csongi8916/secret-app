const { validationResult } = require('express-validator/check');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const { encrypt } = require('../util/crypt');
const { convertToSecretDtoCollection, convertToSecretDto } = require('../util/converter');

const Secret = require('../models/secret');

exports.getSecret = (req, res, next) => {
  const hash = req.params.hash;
  Secret.find({hash: hash}).then(secrets => {
    const decryptedSecret = convertToSecretDto(secrets[0]);
    if (decryptedSecret.remainingViews > 0 && new Date(decryptedSecret.expiresAt) > moment().toDate()) {
      Secret.findOneAndUpdate({ hash: decryptedSecret.hash }, { remainingViews: decryptedSecret.remainingViews-1}).then(result => {
        res.status(200).json({
          message: 'Fetched secrets successfully!',
          secret: convertToSecretDto(result)
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
    } else {
      res.status(401).json({ message: 'Expired secret!' });
    }
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

//just for test
/*exports.getSecrets = (req, res, next) => {
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
};*/

exports.createSecret = (req, res, next) => {
  const secret = new Secret({
    hash: uuidv4(),
    secretText: encrypt(req.body.secret),
    expiresAt: moment().add(req.body.expireAfter, 'minutes'),
    remainingViews: req.body.expireAfterViews
  });
  secret.save().then(result => {
      res.status(201).json({
        message: 'Secret created successfully!',
        secret: convertToSecretDto(result)
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
