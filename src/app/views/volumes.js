const Volume = require('../models/volumes');

module.exports.create = async(req, res) => {
  const volume = await Volume.create(req.body);
  return res.json(volume);
}

module.exports.read = async(req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const volumes = await Volume.paginate(
    { manga: req.params.manga },
    { page: Number(page), limit: Number(limit), populate: ['manga'] }
  );
  return res.json(volumes);
}

module.exports.readOne = async(req, res) => {
  const volume = await Volume.findById(req.params.id).populate(['manga']);
  return res.json(volume);
}

module.exports.update = async(req, res) => {
  const { _id, ...data } = req.body;
  const volume = await Volume.findByIdAndUpdate(req.params.id, data, { new: true });
  return res.json(volume);
}

module.exports.delete = async(req, res) => {
  await Volume.findByIdAndRemove(req.params.id);
  return res.send();
}
