const db = require("../db");
global.db = db;

const createUser = async (username, email, password) => {
  const users = await db.users.insert({ username, email, password });
  console.log(users);
  return users;
};

const getUsers = async (name) => {
  let proxies;
  if (name) {
    proxies = await db.users.find({ name: name });
  } else {
    proxies = await db.users.find({});
  }
  return { proxies };
};

const validateUser = async (username, password) => {
  let proxies = await db.users.find({ username: username });
  console.log(proxies);
  let userId;
  if (proxies.length > 0 && proxies[0].password === password)
    userId = proxies[0]._id;
  return { success: proxies[0].password === password, userId: userId };
};

module.exports = {
  validateUser,
  getUsers,
  createUser,
};
