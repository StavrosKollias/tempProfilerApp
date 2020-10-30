const db = require("../db");
global.db = db;

const createUser = async (username, email, password, type, imageUrl) => {
  let checkIfExistingUser = await db.users.find({ username: username });
  if (checkIfExistingUser.length > 0) {
    return { success: false };
  } else {
    let reset = false;
    const users = await db.users.insert({
      username,
      email,
      password,
      imageUrl,
      reset,
      type,
    });
    console.log(users);

    return { success: true };
  }
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
  // if name fails check email used as login
  if (proxies.length == 0) proxies = await db.users.find({ email: username });
  console.log(proxies);
  let userId, success;
  if (proxies.length > 0 && proxies[0].password === password)
    userId = proxies[0]._id;
  if (proxies.length > 0) success = proxies[0].password === password;
  else success = false;
  return { success: success, userId: userId };
};

module.exports = {
  validateUser,
  getUsers,
  createUser,
};
