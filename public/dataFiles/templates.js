const db = require("../db");
global.db = db;

const createTemplate = async (name, zones, thresholds) => {
  const template = await db.templates.insert({ name, zones, thresholds });
  return template;
};

const getTemplates = async (name) => {
  let proxies;
  if (name) {
    proxies = await db.templates.find({ name: name });
  } else {
    proxies = await db.templates.find({});
  }

  return { proxies };
};

const deleteTemplate = async (name) => {
  const template = await db.templates.remove(
    { name: name },
    { multi: true },
    function (err, numRemoved) {
      console.log(numRemoved);
    }
  );
  return template;
};

const updateTemplate = async (newName, name, zones, thresholds, ovenName) => {
  console.log(name);
  console.log(newName);

  const template = await db.templates.update(
    { name: name },
    { name: newName, ovenName: ovenName, zones: zones, thresholds: thresholds },
    {},
    function (err, numReplaced) {
      // numReplaced = 1
      // The doc #3 has been replaced by { _id: 'id3', planet: 'Pluton' }
      // Note that the _id is kept unchanged, and the document has been replaced
      // (the 'system' and inhabited fields are not here anymore)
      console.log(numReplaced);

      if (!err) {
        deleteTemplate();
      }
    }
  );

  console.log(template);
  console.log(name);
  return template;
};

module.exports = {
  updateTemplate,
  deleteTemplate,
  getTemplates,
  createTemplate,
};
