const Car = require('../entities/Car');

const execute = async function (color, carGateway) {
  const car = new Car({ color });

  const persistedCarDS = await carGateway.save({
    id: car.id,
    color: car.color,
    wheelCount: car.wheelCount,
  });

  const persistedCar = new Car({
    id: persistedCarDS.id,
    color: persistedCarDS.color,
    wheelCount: persistedCarDS.wheelCount,
  });

  return {
    id: persistedCar.id,
    color: persistedCar.color,
    wheelCount: persistedCar.wheelCount,
  };
};
module.exports = execute;
