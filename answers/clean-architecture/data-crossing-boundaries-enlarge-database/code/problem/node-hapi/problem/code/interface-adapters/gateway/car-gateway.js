let dbClient;

const fromDbClient = function (dbClientObject) {
  dbClient = dbClientObject;
  return { save, read };
};

const save = async function ({ color, wheelCount }) {
  let response;

  try {
    response = await dbClient('vehicle')
      .returning('id')
      .insert({ color, wheel_count: wheelCount });
  } catch (error) {
    console.log(error);
  }

  // TODO: check if it would be better to use select instead
  const carRowStructure = (await read(response[0])).car;

  return {
    id: carRowStructure.id,
    color: carRowStructure.color,
    wheelCount: carRowStructure.wheel_count,
  };
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
      color: carRowStructure.color,
      wheelCount: carRowStructure.wheel_count,
    },
  };
};

module.exports = { fromDbClient };
