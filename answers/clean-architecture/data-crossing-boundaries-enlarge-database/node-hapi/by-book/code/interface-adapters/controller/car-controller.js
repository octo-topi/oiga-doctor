const Boom = require('@hapi/boom');

const create = async function ({
  request,
  carGateway,
  identifier,
  createCarUseCase,
}) {
  const color = request.payload.color;

  const car = await createCarUseCase(color, carGateway, identifier);

  return {
    id: car.id,
    licencePlate: car.licencePlate,
    color: car.color,
  };
};

const read = async function ({ request, carGateway, readCarUseCase }) {
  const id = request.params.id;

  const response = await readCarUseCase(id, carGateway);

  if (!response.found) {
    return new Boom.notFound(`There is no car identified by ${id}`);
  }

  const car = response.car;

  return {
    id: car.id,
    color: car.color,
    licencePlate: car.licencePlate,
  };
};

const readAll = async function ({ carGateway, readAllCarsUseCase }) {
  const cars = await readAllCarsUseCase(carGateway);

  return cars.map((car) => {
    return {
      id: car.id,
      licencePlate: car.licencePlate,
      color: car.color,
    };
  });
};

module.exports = { create, read, readAll };
