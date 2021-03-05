const Boom = require('@hapi/boom');

const create = async function ({ request, carGateway, createCarUseCase }) {
  const color = request.payload.color;

  const car = await createCarUseCase(color, carGateway);

  return {
    id: car.id,
    color: car.color,
  };
};

const read = async function ({ request, carGateway, readCarUseCase }) {
  const id = parseInt(request.params.id);

  const response = await readCarUseCase(id, carGateway);

  if (!response.found) {
    return new Boom.notFound(`There is no car identified by ${id}`);
  }

  const car = response.car;

  return {
    id: car.id,
    color: car.color,
  };
};

module.exports = { create, read };
