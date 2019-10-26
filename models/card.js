const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

cardSchema.path('link').validate((val) => {
  // eslint-disable-next-line no-useless-escape
  const urlRegex = /^(http:\/\/|https:\/\/+)(www\.)?((\d+\.\d+\.\d+\.\d+)(:\d{2,5})?|(\w+\.[a-z]+))(\/([\w\/]+)?#?)?$/;
  return urlRegex.test(val);
}, 'Здесь должна быть ссылка.');

module.exports = mongoose.model('card', cardSchema);
