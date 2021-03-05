const Joi = require('joi');

const vehicleController = require('../../interface-adapters/controller/vehicle-controller');
const readVehicleUseCase = require('../../usecases/read-vehicle-usecase');

const fromDbClient = function (dbClient) {
  const vehicleGateway = require('../../interface-adapters/gateway/vehicle-gateway').fromDbClient(
    dbClient,
  );

  const routes = [
    {
      method: 'GET',
      path: '/vehicle/{id}',
      config: {
        auth: false,
        validate: {
          params: Joi.object({
            id: Joi.number().integer().required(),
          }),
        },
        handler: (request) => {
          return vehicleController.read({
            request,
            vehicleGateway,
            readVehicleUseCase,
          });
        },
      },
    },
  ];
  return routes;
};

module.exports = { fromDbClient };
