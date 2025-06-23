const { addUser, fetchUser } = require("../services/user.services");

async function getAllUsers(req, res) {
  const users = await fetchUser();

  try { 
    res.json(users);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
}

async function createUser(req, res) {
  const { email, name, password } = req.body;
  const user = await addUser({ email, name, password });

  res.status(201).json(user);
}

module.exports = { getAllUsers, createUser };