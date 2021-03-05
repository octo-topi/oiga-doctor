let dbClient;

const fromDbClient = function (dbClientObject) {
  dbClient = dbClientObject;
  return { read };
};

const read = async function (id) {
  const vehicleModel = require('../../frameworks-drivers/orm-models/vehicle-model').fromDbClient(
    dbClient,
  ).Vehicle;

  const result = await vehicleModel.where('id', id).fetch();
  const vehicleRowStructure = result.toJSON();

  return {
    id: vehicleRowStructure.id,
    color: vehicleRowStructure.color,
    wheelCount: vehicleRowStructure.wheel_count,
  };
};

module.exports = { fromDbClient };
