const Joi = require('joi');

const carController = require('../../interface-adapters/controller/car-controller');
const createCarUseCase = require('../../usecases/create-car-usecase');
const readCarUseCase = require('../../usecases/read-car-usecase');

const fromDbClient = function (dbClient) {
  const carGateway = require('../../interface-adapters/gateway/car-gateway').fromDbClient(
    dbClient,
  );

  const routes = [
    {
      method: 'POST',
      path: '/car',
      config: {
        auth: false,
        validate: {
          payload: Joi.object({
            color: Joi.string().valid('black', 'yellow'),
          }),
        },
        handler: (request) => {
          return carController.create({
            request,
            carGateway,
            createCarUseCase,
          });
        },
      },
    },
    {
      method: 'GET',
      path: '/car/{id}',
      config: {
        auth: false,
        validate: {
          params: Joi.object({
            id: Joi.number().integer().required(),
          }),
        },
        handler: (request) => {
          return carController.read({
            request,
            carGateway,
            readCarUseCase,
          });
        },
      },
    },
  ];
  return routes;
};

module.exports = { fromDbClient };
