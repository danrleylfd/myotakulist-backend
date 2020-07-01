const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  trailer: {
    type: String,
    required: false
  },
  url: {
    type: String,
    required: false
  },
  anime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Anime',
    required: true
  },
  season: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Season',
    required: true
  }
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Movie', schema);
