const { 
  createUser, 
  getUser, 
  deleteUserById, 
  findUserByEmail, 
  verifyPassword 
} = require("../services/user.services");
const jwt = require("jsonwebtoken");

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...safeUser } = user;

    res.status(200).json('Login successfuly', { user: safeUser, token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await createUser({ name, email, password });
    res.status(201).json('user successfully created', user);
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("email")) {
      return res.status(409).json({ error: "Email already in use" });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
}

async function getAllUsers(req, res) {
  const users = await getUser();
  res.json(users);
}

async function deleteUser(req, res) {
  const { id } = req.body;
  const user = await deleteUserById(id);
  res.json(user);
}

module.exports = { loginUser, registerUser, getAllUsers, deleteUser };