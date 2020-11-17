const electron = require("electron");
const Datastore = require("nedb-promises");
const dbFactory = (fileName) =>
  Datastore.create({
    filename: `${
      process.env.NODE_ENV === "dev"
        ? "."
        : (electron.app || electron.remote.app).getAppPath("userData") // change to getPath("userData") for production
    }/data/${fileName}`,
    timestampData: true,
    autoload: true,
  });
const db = {
  templates: dbFactory("templates.db"),
  oven: dbFactory("oven.db"),
  solder: dbFactory("solder.db"),
  users: dbFactory("users.db"),
};
module.exports = db;
