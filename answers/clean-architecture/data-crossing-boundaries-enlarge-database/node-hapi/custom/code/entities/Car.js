const DEFAULT_COLOR = 'black';

class Car {
  constructor({ id, color }) {
    this.id = id;
    this.color = color || DEFAULT_COLOR;
    this.licencePlate = this.generateLicencePlate();
  }

  generateLicencePlate() {
    return `${this.color.substring(0, 2)}-AB-${this.id.substring(0, 3)}`;
  }
}

module.exports = Car;
