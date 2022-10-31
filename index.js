const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const createAllProducts = require('./src/dbControllers/index')

// Syncing all the models at once.

async function main() {
  try {
    conn.sync({ force: false }).then(async () => {
      await createAllProducts();
      server.listen(process.env.PORT || 3001, async () => {
        console.log("%s listening at 3001"); // eslint-disable-line no-console
      });
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();

