const dbClient = require('./actual-db-client').fromEnvironment(process.env);

const seed = async function () {
  const vehicles = [
    { color: 'blue', wheelCount: 1 },
    { color: 'green', wheelCount: 3 },
    { color: 'yellow', wheelCount: 4 },
  ];

  await Promise.all(
    vehicles.map((vehicle) => {
      return dbClient.raw(
        `INSERT INTO VEHICLE(color, wheel_count) VALUES(:color, :wheelCount)`,
        vehicle,
      );
    }),
  );
};

(async () => {
  await seed();
  // eslint-disable-next-line no-process-exit
  process.exit();
})();
