class Car {
  constructor({ id, color = 'black' }) {
    this.id = id;
    this.color = color;
    this.wheelCount = 4;
  }

  warn() {
    return 'honk;';
  }
}

module.exports = Car;
