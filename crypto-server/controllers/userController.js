const User = require('../models/userModel');



async function registerUser(req, res) {
    const { username, email, password, firstName, lastName } = req.body;
}

async function updateUser(req, res) {
    const { username, email, password, firstName, lastName } = req.body;
}
async function getUser(req, res) {
    const { userId } = req.params;
}
async function deleteUser(req, res) {
    const { userId } = req.body;
}
async function loginUser(req, res) {
    const { email, password } = req.body;
}


module.exports = {registerUser, updateUser, getUser, loginUser, deleteUser};