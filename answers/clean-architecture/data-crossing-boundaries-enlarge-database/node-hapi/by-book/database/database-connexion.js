const fromConfiguration = function (configuration) {
  return {
    hostName: configuration.POSTGRES_HOST || 'localhost',
    hostPort: configuration.POSTGRES_PORT || 5432,
    databaseName: configuration.POSTGRES_DB || 'oiga_doctor',
    databaseUserName: 'postgres',
  };
};

module.exports = { fromConfiguration };
