const Hapi = require('@hapi/hapi');
// eslint-disable-next-line node/no-unpublished-require
const { StatusCodes } = require('http-status-codes');
// eslint-disable-next-line node/no-unpublished-require
const chai = require('chai');
chai.should();

const dbClient = require('../../database/actual-db-client').fromEnvironment(
  process.env,
);

const { emptyVehicles, createVehicle } = require('../test-helper');
const vehicleRoute = require('../../code/frameworks-drivers/routes/vehicle-route').fromDbClient(
  dbClient,
);

describe('Acceptance | vehicle ', function () {
  let server;

  before(async function () {
    server = new Hapi.Server();
    server.route(vehicleRoute);
  });

  describe('GET', function () {
    beforeEach(async function () {
      await emptyVehicles();
    });

    it('return vehicle when request is valid', async function () {
      // given
      const baseVehicle = {
        color: 'blue',
        wheelCount: 1,
      };

      baseVehicle.id = await createVehicle(baseVehicle);

      const request = {
        method: 'GET',
        url: `/vehicle/${baseVehicle.id}`,
      };

      // when
      const response = await server.inject(request);

      // then
      response.statusCode.should.equal(StatusCodes.OK);
      const expectedVehicle = { id: baseVehicle.id, color: baseVehicle.color };
      response.result.should.deep.equal(expectedVehicle);
    });

    it('reject when request is invalid', async function () {
      const invalidId = 'foo';
      // given
      const request = {
        method: 'GET',
        url: `/vehicle/${invalidId}`,
      };

      // when
      const response = await server.inject(request);

      // then
      response.statusCode.should.equal(StatusCodes.BAD_REQUEST);
    });
  });
});
