const express = require('express');
var app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
var app_path = '../dist/crecentip';
app.use('/', express.static(path.join(__dirname, app_path)))
.listen(PORT, () => console.log(`Escuchando el puerto ${PORT}`));

