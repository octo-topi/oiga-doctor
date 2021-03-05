const dbClient = require('../database/actual-db-client').fromEnvironment(
  process.env,
);

const createCar = async function ({ color }) {
  let response;

  try {
    response = await dbClient('vehicle')
      .returning('id')
      .insert({ color, wheel_count: 4 });
  } catch (error) {
    console.log(error);
  }

  const id = response[0];

  return id;
};

const createVehicle = async function ({ color, wheelCount }) {
  let response;

  try {
    response = await dbClient('vehicle')
      .returning('id')
      .insert({ color, wheel_count: wheelCount });
  } catch (error) {
    console.log(error);
  }

  const id = response[0];

  return id;
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
    color: car.color,
    wheelCount: car.wheel_count,
  };
};

module.exports = { createCar, emptyVehicles, readCar, createVehicle };
