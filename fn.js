const json = require("./src/data/pcData.json");

const obj = [];
const funcion = (json) => {
  json.forEach((el) => {
    el.stock = 3;
    obj.push(el);
  });
  return obj;
};

module.exports = funcion;
