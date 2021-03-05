const serialize = function (car) {
  return {
    id: car.id,
    color: car.color,
  };
};
module.exports = { serialize };
