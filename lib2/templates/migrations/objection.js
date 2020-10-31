const pluralize = require("pluralize");


const typeMap = {
    "string":(key) =>   `.string("${key}")`,
    "number":(key) =>   `.integer("${key}")`,
    "boolean":(key) =>   `.boolean("${key}")`,
    "date":(key) =>   `.datetime("${key}")`,
    "increments":(key) =>   `.increments("${key}").primary()`
};

const objectionMigration = (name, attributes) => (`exports.up = function(knex) {
    return knex.schema
    .createTable("${pluralize(name.toLowerCase())}", (table) => {
        ${Object.entries(attributes).map(([key, val]) => `table${typeMap[val](key)}`).join('\n\t\t')}
    })
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTable("${pluralize(name.toLowerCase())}")
  };`);

const objectionMigrationFileName = (name) => {
    const d = new Date();
  
    return (
      d.getFullYear().toString() +
      (d.getMonth() + 1).toString().padStart(2, '0') +
      d.getDate().toString().padStart(2, '0') +
      d.getHours().toString().padStart(2, '0') +
      d.getMinutes().toString().padStart(2, '0') +
      d.getSeconds().toString().padStart(2, '0')
    ) + "_" + name.toLowerCase();
}

module.exports = {
    objectionMigration,
    objectionMigrationFileName,
}