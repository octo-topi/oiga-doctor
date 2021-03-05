const Car = require('../../entities/Car');
const CAR_HAS_FOUR_WHEELS = 4;
let dbClient;

const fromDbClient = function (dbClientObject) {
  dbClient = dbClientObject;
  return { save, read, readAll };
};

const save = async function (car) {
  try {
    await dbClient('vehicle').insert({
      id: car.id,
      licence_plate: car.licencePlate,
      color: car.color,
      wheel_count: CAR_HAS_FOUR_WHEELS,
    });
  } catch (error) {
    console.log(error);
  }
};

const read = async function (id) {
  let carRowStructure;
  try {
    carRowStructure = await dbClient
      .select()
      .from('car')
      .where('id', id)
      .first();
  } catch (error) {
    console.log(error);
  }

  if (carRowStructure === undefined) {
    return {
      found: false,
    };
  }

  return {
    found: true,
    car: new Car({
      id: carRowStructure.id,
      color: carRowStructure.color,
      wheelCount: carRowStructure.wheelCount,
    }),
  };
};

const readAll = async function () {
  let carRowStructures;
  try {
    carRowStructures = await dbClient.select().from('car');
  } catch (error) {
    console.log(error);
  }

  return carRowStructures.map((carRowStructure) => {
    return new Car({
      id: carRowStructure.id,
      licencePlate: carRowStructure.licence_plate,
      color: carRowStructure.color,
    });
  });
};

module.exports = { fromDbClient };
