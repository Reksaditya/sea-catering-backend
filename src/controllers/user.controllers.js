const { 
  createUser, 
  getUser, 
  deleteUserById, 
  findUserByEmail, 
  findUserById,
  verifyPassword,
  updateUserById
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
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { password: _, ...safeUser } = user;

    res.status(200).json({
      user: safeUser,
      message: 'Login successful',
      token: token,
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function registerUser(req, res) {
  const { name, email, password, avatarUrl } = req.body;
  
  try {
    const user = await createUser({ name, email, password, avatarUrl });
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

async function getUserId(req, res) {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
}

async function deleteUser(req, res) {
  const { id } = req.body;
  const user = await deleteUserById(id);
  res.json(user);
}

async function updateUser(req, res) {
  const userId = req.user.id; 
  const { name, email, phone, role } = req.body;

  try {
    const user = await updateUserById(userId, { name, email, phone, role });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update profile' });
  }
}

async function fetchSubscriptions(req, res) {
  const userId = req.user.id; 
  const { status } = req.query;

  try {
    const subscriptions = await getUserSubscriptions(userId, status);
    res.json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
}


module.exports = { 
  loginUser, 
  registerUser, 
  getAllUsers, 
  deleteUser, 
  updateUser, 
  getUserId,
  fetchSubscriptions
};