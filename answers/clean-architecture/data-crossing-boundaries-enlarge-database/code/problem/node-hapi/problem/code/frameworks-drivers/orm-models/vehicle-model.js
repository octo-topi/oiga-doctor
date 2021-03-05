const fromDbClient = function (dbClient) {
  const bookshelf = require('bookshelf')(dbClient);

  const Vehicle = bookshelf.model('Vehicle', {
    tableName: 'vehicle',
  });

  return { Vehicle };
};

module.exports = {
  fromDbClient,
};
