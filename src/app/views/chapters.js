const Chapter = require('../models/chapters');

module.exports.create = async(req, res) => {
  const chapter = await Chapter.create(req.body);
  return res.json(chapter);
}

module.exports.read = async(req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const chapters = await Chapter.paginate(
    { volume: req.params.volume },
    { page: Number(page), limit: Number(limit), populate: ['manga', 'volume'] }
  );
  return res.json(chapters);
}

module.exports.readOne = async(req, res) => {
  const chapter = await Chapter.findById(req.params.id).populate(['manga', 'volume']);
  return res.json(chapter);
}

module.exports.update = async(req, res) => {
  const { _id, ...data } = req.body;
  const chapter = await Chapter.findByIdAndUpdate(req.params.id, data, { new: true });
  return res.json(chapter);
}

module.exports.delete = async(req, res) => {
  await Chapter.findByIdAndRemove(req.params.cp);
  return res.send();
}
