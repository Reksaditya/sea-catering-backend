const prisma = require('../prisma/client');
const bcrypt = require("bcrypt");

async function createUser({ email, name, password, avatarUrl }) {
  const hashedPassword = await bcrypt.hash(password, 10)
  return await prisma.User.create({
    data: {
      email,
      name,
      password: hashedPassword,
      avatarUrl
    },
  });
}

async function findUserByEmail(email) {
  return await prisma.User.findUnique({ 
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      password: true, 
    }
  });
}


async function verifyPassword(inputPassword, hashedPassword) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}
async function findUserById(id) {
  return await prisma.User.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatarUrl: true,
    }
  });
}

async function getUser() {
  const user = await prisma.User.findMany();
  return user;
}

async function deleteUserById(id) {
  const user = await prisma.User.findUnique({ where: { id } });
  return user;
}

async function updateUserById(userId, updateData) {
  return await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
}

module.exports = { 
  createUser, 
  getUser, 
  deleteUserById, 
  findUserByEmail, 
  findUserById,
  verifyPassword, 
  updateUserById 
};