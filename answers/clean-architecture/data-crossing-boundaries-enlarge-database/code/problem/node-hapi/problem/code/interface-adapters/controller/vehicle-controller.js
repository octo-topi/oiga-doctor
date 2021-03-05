const read = async function ({ request, vehicleGateway, readVehicleUseCase }) {
  const id = parseInt(request.params.id);

  const car = await readVehicleUseCase(id, vehicleGateway);
  return {
    id: car.id,
    color: car.color,
  };
};

module.exports = { read };
