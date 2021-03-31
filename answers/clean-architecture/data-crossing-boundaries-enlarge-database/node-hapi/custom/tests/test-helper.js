const dbClient = require('../database/actual-db-client').fromEnvironment(
  process.env,
);

const identifier = require('../code/frameworks-drivers/identifier');

const createCar = async function ({ color }) {
  const id = identifier.get();
  const licencePlate = `${color.substring(0, 2)}-AB-${id.substring(0, 3)}`;
  const car = {
    id,
    licencePlate,
    color,
    wheelCount: 4,
  };

  try {
    await dbClient('vehicle').insert({
      id: car.id,
      licence_plate: car.licencePlate,
      color: car.color,
      wheel_count: 4,
    });
  } catch (error) {
    console.log(error);
  }
  return {
    id: car.id,
    licencePlate: car.licencePlate,
    color: car.color,
  };
};

const createCars = async function (cars) {
  return Promise.all(
    cars.map((car) => {
      return createCar({ color: car.color });
    }),
  );
};

const emptyVehicles = async function () {
  try {
    await dbClient('vehicle').truncate();
  } catch (error) {
    console.log(error);
  }
};

const readCar = async function (id) {
  let car;
  try {
    car = await dbClient.select().from('vehicle').where('id', id).first();
  } catch (error) {
    console.log(error);
  }
  return {
    id: car.id,
    licencePlate: car.licence_plate,
    color: car.color,
  };
};

module.exports = { createCar, emptyVehicles, readCar, createCars };
