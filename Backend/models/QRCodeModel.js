const mongoose = require('mongoose');

const QRSchema = new mongoose.Schema({
  qr: {type: String, required: true},
  date: {type: Date, required: true},
});

module.exports = mongoose.model('QRCodeModel', QRSchema);