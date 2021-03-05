const Hapi = require('@hapi/hapi');
// eslint-disable-next-line node/no-unpublished-require
const { StatusCodes } = require('http-status-codes');
// eslint-disable-next-line node/no-unpublished-require
const chai = require('chai');
chai.should();

const dbClient = require('../../database/actual-db-client').fromEnvironment(
  process.env,
);

const { createCar, emptyVehicles, readCar } = require('../test-helper');
const carRoute = require('../../code/frameworks-drivers/routes/car-route').fromDbClient(
  dbClient,
);

describe('Acceptance | car ', function () {
  let server;

  before(async function () {
    server = new Hapi.Server();
    server.route(carRoute);
  });

  describe('POST', function () {
    beforeEach(async function () {
      await emptyVehicles();
    });

    it('return car when request is valid', async function () {
      // given
      const request = {
        method: 'POST',
        url: '/car',
        payload: {
          color: 'yellow',
        },
      };

      // when
      const response = await server.inject(request);

      // then
      response.statusCode.should.equal(StatusCodes.OK);
      response.result.color.should.equal(request.payload.color);
      response.result.id.should.not.be.undefined;
    });

    it('persist car when request is valid', async function () {
      const baseCar = {
        color: 'yellow',
      };
      // given
      const request = {
        method: 'POST',
        url: '/car',
        payload: {
          color: baseCar.color,
        },
      };

      // when
      const response = await server.inject(request);

      // then
      const car = await readCar(response.result.id);
      car.should.include(baseCar);
    });

    it('reject when request is invalid', async function () {
      // given
      const request = {
        method: 'POST',
        url: '/car',
        payload: {
          color: 'cyan',
        },
      };

      // when
      const response = await server.inject(request);

      // then
      response.statusCode.should.equal(StatusCodes.BAD_REQUEST);
    });
  });

  describe('GET', function () {
    beforeEach(async function () {
      await emptyVehicles();
    });

    it('return car when request is valid', async function () {
      // given
      const baseCar = {
        color: 'blue',
      };

      baseCar.id = await createCar(baseCar);

      const request = {
        method: 'GET',
        url: `/car/${baseCar.id}`,
      };

      // when
      const response = await server.inject(request);

      // then
      response.statusCode.should.equal(StatusCodes.OK);
      const expectedCar = { id: baseCar.id, color: baseCar.color };
      response.result.should.deep.equal(expectedCar);
    });

    it('reject when request is invalid', async function () {
      const invalidId = 'foo';
      // given
      const request = {
        method: 'GET',
        url: `/car/${invalidId}`,
      };

      // when
      const response = await server.inject(request);

      // then
      response.statusCode.should.equal(StatusCodes.BAD_REQUEST);
    });

    it('reject when resource does not exists', async function () {
      const nonExistingId = '1';
      // given
      const request = {
        method: 'GET',
        url: `/car/${nonExistingId}`,
      };

      // when
      const response = await server.inject(request);

      // then
      response.statusCode.should.equal(StatusCodes.NOT_FOUND);
    });
  });
});
