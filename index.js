const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {createMotherBoard} = require('./src/routes/Controllers/motherBoard')
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3001, async () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    createMotherBoard()
  });
});
