const execute = async function (id, carGateway) {
  return carGateway.read(id);
};

module.exports = execute;
