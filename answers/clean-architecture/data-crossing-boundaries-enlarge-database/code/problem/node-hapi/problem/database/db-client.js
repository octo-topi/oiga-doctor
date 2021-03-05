const fromConfiguration = function (configuration) {
  // console.dir(connectionDescription);
  const dbClient = require('knex')(configuration);
  return dbClient;
};

module.exports = { fromConfiguration };
