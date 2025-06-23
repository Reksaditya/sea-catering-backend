const prisma = require('../prisma/client');

async function addUser({ email, name, password }) {
  const user = await prisma.User.create({
    data: {
      email,
      name,
      password
    },
  });
  return user;
}

async function fetchUser() {
  const users = await prisma.user.findMany();
  return users;
}

module.exports = { addUser, fetchUser };