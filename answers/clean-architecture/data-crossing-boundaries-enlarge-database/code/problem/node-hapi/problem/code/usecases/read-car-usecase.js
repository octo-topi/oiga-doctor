const Car = require('../entities/Car');

const execute = async function (id, carGateway) {
  const response = await carGateway.read(id);

  if (!response.found) {
    return { found: false };
  }

  const carDS = response.car;

  const car = new Car({
    id: carDS.id,
    color: carDS.color,
    wheelCount: carDS.wheelCount,
  });

  return {
    found: true,
    car: {
      id: car.id,
      color: car.color,
      wheelCount: car.wheelCount,
    },
  };
};

module.exports = execute;
