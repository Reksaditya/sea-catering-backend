const prisma = require('../prisma/client');
const bcrypt = require("bcrypt");

async function createUser({ email, name, password }) {
  const hashedPassword = await bcypt.hash(password, 10)
  return await prisma.User.create({
    data: {
      email,
      name,
      password: hashedPassword
    },
  });
}

async function findUserByEmail(email) {
  return await prisma.User.findUnique({ where: { email } });
}

async function verifyPassword(inputPassword, hashedPassword) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}

async function getUser() {
  const user = await prisma.User.findMany();
  return user;
}

async function deleteUserById() {
  const user = await prisma.User.findUnique({ where: { id } });
  return user;
}

module.exports = { createUser, getUser, deleteUserById, findUserByEmail, verifyPassword };