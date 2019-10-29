const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    select: false,
  },
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
  avatar: {
    type: String,
    required: true,
  },
});

userSchema.path('email').validate(validator.isEmail, 'Вы ввели неверный e-mail `{VALUE}`');
userSchema.path('avatar').validate(validator.isURL, 'Здесь должна быть ссылка на картинку');


module.exports = mongoose.model('user', userSchema);
