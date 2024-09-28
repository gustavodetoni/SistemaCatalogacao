const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const animalRoutes = require('./routes/animalRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/animais', animalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando`);
});