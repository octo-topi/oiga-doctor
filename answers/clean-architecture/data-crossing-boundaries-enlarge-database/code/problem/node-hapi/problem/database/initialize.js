const dbClient = require('./actual-db-client').fromEnvironment(process.env);

const initialize = async function () {
  await dbClient.raw(`DROP VIEW IF EXISTS car`);

  await dbClient.raw(`DROP TABLE IF EXISTS vehicle`);

  await dbClient.raw(`CREATE TABLE vehicle (
        id SERIAL NOT NULL PRIMARY KEY,
        color TEXT,
        wheel_count INTEGER NOT NULL,
        created_at DATE DEFAULT NOW(),
        CHECK (wheel_count > 0)
    )`);

  await dbClient.raw(`CREATE VIEW car AS 
        SELECT id, color FROM vehicle`);
};

(async () => {
  await initialize();
  // eslint-disable-next-line no-process-exit
  process.exit();
})();
