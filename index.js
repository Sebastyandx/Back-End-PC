const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const getProcesadoresData = require("./src/dbControllers/ProcesadorController");
const { Procesador } = require("./src/db");

// Syncing all the models at once.

async function main() {
  try {
    conn.sync({ force: true }).then(async () => {
      await getProcesadoresData();
      server.listen(3001, () => {
        console.log("%s listening at 3001"); // eslint-disable-line no-console
      });
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
