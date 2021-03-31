const CAR_HAS_FOUR_WHEELS = 4;

let dbClient;

const fromDbClient = function (dbClientObject) {
  dbClient = dbClientObject;
  return { save, read, readAll };
};

const save = async function ({ id, licencePlate, color }) {
  try {
    await dbClient('vehicle').insert({
      id,
      licence_plate: licencePlate,
      color,
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
    car: {
      id: carRowStructure.id,
      licencePlate: carRowStructure.licence_plate,
      color: carRowStructure.color,
    },
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
    return {
      id: carRowStructure.id,
      licencePlate: carRowStructure.licence_plate,
      color: carRowStructure.color,
    };
  });
};

module.exports = { fromDbClient };
