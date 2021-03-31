const Boom = require('@hapi/boom');

const create = async function ({
  request,
  carGateway,
  identifier,
  createCarUseCase,
}) {
  const color = request.payload.color;

  return await createCarUseCase(color, carGateway, identifier);
};

const read = async function ({ request, carGateway, readCarUseCase }) {
  const id = request.params.id;

  const response = await readCarUseCase(id, carGateway);

  if (!response.found) {
    return new Boom.notFound(`There is no car identified by ${id}`);
  }

  return response.car;
};

const readAll = async function ({ carGateway, readAllCarsUseCase }) {
  return readAllCarsUseCase(carGateway);
};

module.exports = { create, read, readAll };
