const Movie = require('../models/movies');

module.exports.create = async(req, res) => {
  const movie = await Movie.create(req.body);
  return res.json(movie);
}

module.exports.read = async(req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const movies = await Movie.paginate(
    { season: req.params.season },
    { page: Number(page), limit: Number(limit), populate: ['anime', 'season'] }
  );
  return res.json(movies);
}

module.exports.readOne = async(req, res) => {
  const movie = await Movie.findById(req.params.id).populate(['anime', 'season']);
  return res.json(movie);
}

module.exports.update = async(req, res) => {
  const { _id, ...data } = req.body;
  const movie = await Movie.findByIdAndUpdate(req.params.id, data, { new: true });
  return res.json(movie);
}

module.exports.delete = async(req, res) => {
  await Movie.findByIdAndRemove(req.params.id);
  return res.send();
}
