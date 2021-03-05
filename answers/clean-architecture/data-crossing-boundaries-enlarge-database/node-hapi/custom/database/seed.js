const dbClient = require('./actual-db-client').fromEnvironment(process.env);

const seedCars = async function () {
  const cars = [
    { id: 'f2b', licencePlate: 'ye-AB-f2b', color: 'yellow' },
    { id: 'c8e', licencePlate: 'bl-AB-c8e', color: 'blue' },
  ];

  await Promise.all(
    cars.map((vehicle) => {
      return dbClient.raw(
        `INSERT INTO VEHICLE(id, licence_plate, color, wheel_count) VALUES(:id, :licencePlate, :color, 4)`,
        vehicle,
      );
    }),
  );
};

const seedVehicles = async function () {
  const vehicles = [
    { id: 'a5e', color: 'blue', wheelCount: 1 },
    { id: '71d', color: 'green', wheelCount: 3 },
    { id: '6ba', color: 'green', wheelCount: 5 },
  ];

  await Promise.all(
    vehicles.map((vehicle) => {
      return dbClient.raw(
        `INSERT INTO VEHICLE(id, color, wheel_count) VALUES(:id, :color, :wheelCount)`,
        vehicle,
      );
    }),
  );
};

(async () => {
  await seedCars();
  await seedVehicles();
  // eslint-disable-next-line no-process-exit
  process.exit();
})();
