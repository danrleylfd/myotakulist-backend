const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  studio: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  sinopse: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  genres: [{
    type: String,
    required: true
  }],
  alias: {
    type: String,
    required: false
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }],
  manga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manga',
    required: false
  }
}, { timestamps: true });

schema.pre('save', async function (next) {
  this.alias = this.title.split(" ").join("-").toLowerCase().split(".").join("").split("/").join("");
  next();
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Anime', schema);
