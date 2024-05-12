const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    salt: String,
    hash: String,
    });

const User = mongoose.model('User', userSchema);


