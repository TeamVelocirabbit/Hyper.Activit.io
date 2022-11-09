const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const SessionModel = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 30, default: Date.now }
  });

  const Session = mongoose.model('Session', SessionModel);

  module.exports = Session; 