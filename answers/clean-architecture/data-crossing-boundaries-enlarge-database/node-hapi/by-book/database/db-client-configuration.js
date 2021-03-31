const fromDatabaseConnexionAndEnvironment = function ({
  databaseConnexion,
  environment,
}) {
  const configuration = {
    development: {
      client: 'postgresql',
      //debug: true,
      connection: {
        host: databaseConnexion.hostName,
        port: databaseConnexion.hostPort,
        database: databaseConnexion.databaseName,
        user: databaseConnexion.databaseUserName,
      },
      pool: {
        min: 1,
        max: 2,
      },
    },
  };

  return configuration[environment];
};

module.exports = { fromDatabaseConnexionAndEnvironment };
