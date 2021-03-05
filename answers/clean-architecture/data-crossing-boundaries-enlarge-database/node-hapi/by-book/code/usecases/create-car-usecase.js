const Car = require('../entities/Car');

const execute = async function (color, carGateway, identifier) {
  const car = new Car({
    id: identifier.get(),
    color,
  });

  await carGateway.save({
    id: car.id,
    licencePlate: car.licencePlate,
    color: car.color,
  });

  return {
    id: car.id,
    licencePlate: car.licencePlate,
    color: car.color,
    wheelCount: car.wheelCount,
  };
};
module.exports = execute;
