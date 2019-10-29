const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

// eslint-disable-next-line func-names
userSchema.static.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Пользователь с таким e-mail или паролем не найден'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Пользователь с таким e-mail или паролем не найден'));
          }
          return user;
        });
    });
};


module.exports = mongoose.model('user', userSchema);
