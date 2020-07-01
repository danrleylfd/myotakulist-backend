const Ova = require('../models/ovas');

module.exports.create = async(req, res) => {
  const ova = await Ova.create(req.body);
  return res.json(ova);
}

module.exports.read = async(req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const ovas = await Ova.paginate(
    { season: req.params.season },
    { page: Number(page), limit: Number(limit), populate: ['anime', 'season'] }
  );
  return res.json(ovas);
}

module.exports.readOne = async(req, res) => {
  const ova = await Ova.findById(req.params.id).populate(['anime', 'season']);
  return res.json(ova);
}

module.exports.update = async(req, res) => {
  const { _id, ...data } = req.body;
  const ova = await Ova.findByIdAndUpdate(req.params.id, data, { new: true });
  return res.json(ova);
}

module.exports.delete = async(req, res) => {
  await Ova.findByIdAndRemove(req.params.id);
  return res.send();
}
