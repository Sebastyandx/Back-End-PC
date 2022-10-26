const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  getAllMothersData,
} = require("./src/routes/Controllers/MothersController.js");

// Syncing all the models at once.
async function main() {
  try {
    conn
      .sync({
        force: false,
      })
      .then(() => {
        server.listen(3001, () => {
          console.log("%s listening at 3001");
        });
      });
    await getAllMothersData();
  } catch (error) {
    console.error(error);
  }
}
main();
