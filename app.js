const express = require('express');
const path = require('path');

const { PORT = 3000 } = process.env;
const app = express();

const users = require('./routes/users');
const cards = require('./routes/cards');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/cards', cards);
app.use((req, res) => {
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
