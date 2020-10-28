const electron = require("electron");
const Datastore = require("nedb-promises");
const dbFactory = (fileName) =>
  Datastore.create({
    filename: `${process.env.NODE_ENV === "dev" ? "." : (electron.app || electron.remote.app).getAppPath("userData")
      }/data/${fileName}`,
    timestampData: true,
    autoload: true,
  });

const db = {
  templates: dbFactory("templates.db"),
  oven: dbFactory("oven.db"),
};
module.exports = db;
