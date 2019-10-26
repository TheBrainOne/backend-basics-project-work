const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: String,
});

userSchema.path('avatar').validate((val) => {
  // eslint-disable-next-line no-useless-escape
  const urlRegex = /^(http:\/\/|https:\/\/+)(www\.)?((\d+\.\d+\.\d+\.\d+)(:\d{2,5})?|(\w+\.[a-z]+))(\/([\w\/]+)?#?)?$/;
  return urlRegex.test(val);
}, 'Здесь должна быть ссылка.');


module.exports = mongoose.model('user', userSchema);
