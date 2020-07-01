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
  manga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manga',
    required: true
  }
}, { timestamps: true });

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Volume', schema);
