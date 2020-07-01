const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: false
  },
  trailer: {
    type: String,
    required: false
  },
  anime: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Anime',
    required: true
  }
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Season', schema);
