const Car = require('../entities/Car');

const execute = async function (color, carGateway, identifier) {
  const car = new Car({
    id: identifier.get(),
    color,
  });

  await carGateway.save(car);

  return car;
};
module.exports = execute;
