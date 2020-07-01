const Manga = require('../models/mangas');

module.exports.create = async(req, res) => {
  const manga = await Manga.create(req.body);
  return res.json(manga);
}

module.exports.read = async(req, res) => {
  const { page = 1, limit = 10, sort = '-createdAt', genres, likes, ...reqQuery } = req.query;
  const query = {};
  const [keys,values] = [Object.keys(reqQuery),Object.values(reqQuery)];
  values.filter(val => Number.isNaN(val)).map((val,i) => query[keys[i]] = new RegExp(val, "i"));
  const mangas = await Manga.paginate(
    { ...query, genres: genres ? { $in: genres.split(',') } : new RegExp('', "i") },
    { page: Number(page), limit: Number(limit), sort }
  );
  return res.json(mangas);
}

module.exports.readOne = async(req, res) => {
  const manga = await Manga.findById(req.params.id);
  return res.json(manga);
}

module.exports.update = async(req, res) => {
  const { _id, ...data } = req.body;
  const manga = await Manga.findByIdAndUpdate(req.params.id, data, { new: true });
  return res.json(manga);
}

module.exports.delete = async(req, res) => {
  await Manga.findByIdAndRemove(req.params.id);
  return res.send();
}

module.exports.createBookmark = async(req, res) => {
  const manga = await Manga.findByIdAndUpdate(req.params.id, {
    $push: { likes: req.body.id }
  }, { new: true });
  return res.status(200).json(manga);
}

module.exports.readBookmarks = async(req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const mangas = await Manga.paginate(
    { likes: { $in: req.params.id } },
    { page: Number(page), limit: Number(limit) }
  );
  return res.status(200).json(mangas);
}

module.exports.deleteBookmark = async(req, res) => {
  const manga = await Manga.findById(req.params.id);
  const pos = manga.likes.indexOf(req.params.id);
  manga.likes.splice(pos, 1);
  console.log(manga.likes);
  await manga.save();
  return res.status(204).send();
}

