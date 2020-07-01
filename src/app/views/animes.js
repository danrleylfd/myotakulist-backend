const Anime = require('../models/animes');

module.exports.create = async(req, res) => {
  const anime = await Anime.create(req.body);
  return res.json(anime);
}

module.exports.read = async(req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt', genres, likes, ...reqQuery } = req.query;
  const query = {};
  const [keys,values] = [Object.keys(reqQuery),Object.values(reqQuery)];
  values.filter(val => Number.isNaN(val)).map((val,i) => query[keys[i]] = new RegExp(val, "i"));
  const animes = await Anime.paginate(
    { ...query, genres: genres ? { $in: genres.split(',') } : new RegExp('', "i") },
    { page: Number(page), limit: Number(limit), sort, populate: ['manga'] }
  );
  return res.json(animes);
}

module.exports.readOne = async(req, res) => {
  const anime = await Anime.findOne({ alias: req.params.alias }).populate(['manga']);
  return res.json(anime);
}

module.exports.update = async(req, res) => {
  const { _id, ...data } = req.body;
  const anime = await Anime.findByIdAndUpdate(req.params.id, data, { new: true }).populate(['manga']);
  return res.json(anime);
}

module.exports.delete = async(req, res) => {
  await Anime.findByIdAndRemove(req.params.id);
  return res.send();
}

module.exports.createBookmark = async(req, res) => {
  const anime = await Anime.findByIdAndUpdate(req.params.id, {
    $push: { likes: req.body.id }
  }, { new: true });
  return res.status(200).json(anime);
}

module.exports.readBookmarks = async(req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const animes = await Anime.paginate(
    { likes: { $in: req.params.id } },
    { page: Number(page), limit: Number(limit) }
  );
  return res.status(200).json(animes);
}

module.exports.deleteBookmark = async(req, res) => {
  const anime = await Anime.findById(req.params.id);
  const pos = anime.likes.indexOf(req.params.id);
  anime.likes.splice(pos, 1);
  console.log(anime.likes);
  await anime.save();
  return res.status(204).send();
}
