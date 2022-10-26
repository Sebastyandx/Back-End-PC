// const e = require("express");
// const { Mothers } = require("../../db");

// const getMotherDB = async () => {
//   const dbMother = await Mothers.create({
//     attributes: ["id", "name", "brand", "img", "detail", "cost"],
//   });
//   let mapDb = dbMother.map((e) => e.dataValues);
//   mapDb = mapDb.map((el) => {
//     let arrDetail = el.detail.map(
//       (el) => el.connectivity,
//       el.Socket,
//       el.energy,
//       el.Sound,
//       el.Memory,
//       el.Dimensions
//     );
//     return {
//       id: el.id,
//       name: el.name,
//       brand: el.brand,
//       img: el.img,
//       detail: arrDetail,
//       cost: el.cost,
//     };
//   });
//   return mapDb;
// };

// const getAllMothersData = async () => {
//   try {
//     const motherDB = await getMotherDB();
//     return motherDB;
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = {
//   getMotherDB,
//   getAllMothersData,
// };
