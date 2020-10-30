const db = require("../db");
global.db = db;

const createOven = async (name, tempaleName, solderType) => {
  const oven = await db.oven.insert({ name, tempaleName, solderType });
  return oven;
};

const getOven = async () => {
  const proxies = await db.oven.find({});
  return { proxies };
};

const deleteOven = async (name) => {
  const oven = await db.oven.remove({ name: name }, { multi: true }, function (
    err,
    numRemoved
  ) {
    console.log(numRemoved);
  });
  return oven;
};

const updateOven = async (newName, name, templateName, soldreType) => {
  console.log(name);
  console.log(newName);
  const oven = await db.oven.update(
    { name: name },
    { name: newName, templateName: templateName, soldreType: soldreType },
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
  console.log(oven);
  console.log(name);
  return oven;
};

module.exports = {
  updateOven,
  deleteOven,
  getOven,
  createOven,
};
