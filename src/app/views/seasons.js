const Season = require('../models/seasons');

module.exports.create = async(req, res) => {
  const season = await Season.create(req.body);
  return res.json(season);
}

module.exports.read = async(req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const seasons = await Season.paginate(
    { anime: req.params.anime },
    { page: Number(page), limit: Number(limit), populate: ['anime'] }
  );
  return res.json(seasons);
}

module.exports.readOne = async(req, res) => {
  const season = await Season.findById(req.params.id).populate(['anime']);
  return res.json(season);
}

module.exports.update = async(req, res) => {
  const { _id, ...data } = req.body;
  const season = await Season.findByIdAndUpdate(req.params.id, data, { new: true });
  return res.json(season);
}

module.exports.delete = async(req, res) => {
  await Season.findByIdAndRemove(req.params.id);
  return res.send();
}
