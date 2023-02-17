const Crypto = require('../models/Crypto')
exports.getAll = () => Crypto.find({}).lean();
exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean();
exports.buy = async (userId, cryptoId) => {
   const crypto = await Crypto.findById(cryptoId);
   //check if user has already bought the crypto
   crypto.buyers.push(userId);
   return crypto.save();

}
exports.create = (ownerId, cryptoData) =>Crypto.create({...cryptoData, owner: ownerId});

exports.edit = (cryptoId, cryptoData) =>Crypto.findByIdAndUpdate(cryptoId, cryptoData);

