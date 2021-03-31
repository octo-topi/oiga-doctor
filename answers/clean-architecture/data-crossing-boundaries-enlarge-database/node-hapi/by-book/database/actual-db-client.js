const fromEnvironment = function (configuration) {
  const environment = configuration.ENVIRONMENT || 'development';

  const databaseConnexion = require('./database-connexion').fromConfiguration(
    configuration,
  );

  const dbClientConfiguration = require('./db-client-configuration.js').fromDatabaseConnexionAndEnvironment(
    {
      databaseConnexion,
      environment,
    },
  );

  const dbClient = require('./db-client').fromConfiguration(
    dbClientConfiguration,
  );

  return dbClient;
};

module.exports = { fromEnvironment };
