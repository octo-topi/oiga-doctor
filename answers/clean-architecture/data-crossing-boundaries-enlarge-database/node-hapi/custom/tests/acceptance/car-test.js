const Hapi = require('@hapi/hapi');
// eslint-disable-next-line node/no-unpublished-require
const { StatusCodes } = require('http-status-codes');
// eslint-disable-next-line node/no-unpublished-require
const chai = require('chai');
chai.should();

const dbClient = require('../../database/actual-db-client').fromEnvironment(
  process.env,
);

const {
  createCar,
  createCars,
  emptyVehicles,
  readCar,
} = require('../test-helper');
const carRoute = require('../../code/frameworks-drivers/routes/car-route').fromDbClient(
  dbClient,
);

describe('Acceptance | cars ', function () {
  let server;

  before(async function () {
    server = new Hapi.Server();
    server.route(carRoute);
  });

  describe('POST cars', function () {
    beforeEach(async function () {
      await emptyVehicles();
    });

    it('return car when request is valid', async function () {
      // given
      const carColor = 'yellow';

      const request = {
        method: 'POST',
        url: '/cars',
        payload: {
          color: carColor,
        },
      };

      // when
      const response = await server.inject(request);
      const car = response.result;

      // then
      response.statusCode.should.equal(StatusCodes.OK);

      car.color.should.equal(carColor);
      car.id.should.not.be.undefined;
      car.licencePlate.should.not.be.undefined;
    });

    it('persist car when request is valid', async function () {
      // given
      const expectedCar = {
        color: 'yellow',
      };
      const request = {
        method: 'POST',
        url: '/cars',
        payload: {
          color: expectedCar.color,
        },
      };

      // when
      const response = await server.inject(request);
      const actualCarId = response.result.id;
      const actualCar = await readCar(actualCarId);

      // then
      actualCar.should.include(expectedCar);
    });

    it('reject when request is invalid', async function () {
      // given
      const invalidColor = 'cyan';
      const request = {
        method: 'POST',
        url: '/cars',
        payload: {
          color: invalidColor,
        },
      };

      // when
      const response = await server.inject(request);

      // then
      response.statusCode.should.equal(StatusCodes.BAD_REQUEST);
    });
  });

  describe('GET car', function () {
    beforeEach(async function () {
      await emptyVehicles();
    });

    it('return car when request is valid', async function () {
      // given
      const expectedCar = await createCar({
        color: 'blue',
      });

      const request = {
        method: 'GET',
        url: `/cars/${expectedCar.id}`,
      };

      // when
      const response = await server.inject(request);
      const actualCar = response.result;

      // then
      response.statusCode.should.equal(StatusCodes.OK);
      actualCar.should.deep.equal(expectedCar);
    });

    it('reject when request is invalid', async function () {
      // given
      const invalidId = 'a';
      const request = {
        method: 'GET',
        url: `/cars/${invalidId}`,
      };

      // when
      const response = await server.inject(request);

      // then
      response.statusCode.should.equal(StatusCodes.BAD_REQUEST);
    });

    it('reject when resource does not exists', async function () {
      // given
      const nonExistingId = 'foo';
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

  describe('GET cars', function () {
    beforeEach(async function () {
      await emptyVehicles();
    });

    it('return cars when request is valid', async function () {
      // given
      const expectedCars = await createCars([
        {
          color: 'blue',
        },
        { color: 'yellow' },
      ]);

      const request = {
        method: 'GET',
        url: '/cars',
      };

      // when
      const response = await server.inject(request);
      const actualCars = response.result;

      // then
      response.statusCode.should.equal(StatusCodes.OK);
      actualCars.should.deep.equal(expectedCars);
    });

    it('return empty collection when needed', async function () {
      // given
      const request = {
        method: 'GET',
        url: '/cars',
      };

      // when
      const response = await server.inject(request);

      // then
      response.statusCode.should.equal(StatusCodes.OK);
      response.result.should.deep.equal([]);
    });
  });
});
