const execute = async function (carGateway) {
  return carGateway.readAll();
};

module.exports = execute;
