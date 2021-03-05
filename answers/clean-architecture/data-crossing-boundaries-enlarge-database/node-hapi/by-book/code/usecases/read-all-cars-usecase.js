const Car = require('../entities/Car');

const execute = async function (carGateway) {
  const carsDS = await carGateway.readAll();

  const cars = carsDS.map((carDS) => {
    return new Car({
      id: carDS.id,
      color: carDS.color,
    });
  });

  return cars.map((car) => {
    return {
      id: car.id,
      color: car.color,
      licencePlate: car.licencePlate,
    };
  });
};

module.exports = execute;
