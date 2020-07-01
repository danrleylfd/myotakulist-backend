const Episode = require('../models/episodes');

module.exports.create = async(req, res) => {
  const episode = await Episode.create(req.body);
  return res.json(episode);
}

module.exports.read = async(req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const episodes = await Episode.paginate(
    { season: req.params.season },
    { page: Number(page), limit: Number(limit), populate: ['anime', 'season'] }
  );
  return res.json(episodes);
}

module.exports.readOne = async(req, res) => {
  const episode = await Episode.findById(req.params.id).populate(['anime', 'season']);
  return res.json(episode);
}

module.exports.update = async(req, res) => {
  const { _id, ...data } = req.body;
  const episode = await Episode.findByIdAndUpdate(req.params.id, data, { new: true });
  return res.json(episode);
}

module.exports.delete = async(req, res) => {
  await Episode.findByIdAndRemove(req.params.id);
  return res.send();
}
