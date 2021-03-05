const execute = async function (id, vehicleGateway) {
  const carDS = await vehicleGateway.read(id);

  return {
    id: carDS.id,
    color: carDS.color,
    wheelCount: carDS.wheelCount,
  };
};

module.exports = execute;
