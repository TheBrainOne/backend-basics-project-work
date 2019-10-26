const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

const users = require('./routes/users');
const cards = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/cards', cards);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.use((req, res, next) => {
  req.user = {
    _id: '5db3e17a75909a2a7c86b449',
  };

  next();
});

app.listen(PORT, () => {
});
