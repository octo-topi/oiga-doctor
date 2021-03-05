const Hapi = require('@hapi/hapi');

const carRoute = require('./routes/car-route');
const vehicleRoute = require('./routes/vehicle-route');

const dbClient = require('../../database/actual-db-client').fromEnvironment(
  process.env,
);

const start = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  const routes = carRoute
    .fromDbClient(dbClient)
    .concat(vehicleRoute.fromDbClient(dbClient));

  server.route(routes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

module.exports = { start };
