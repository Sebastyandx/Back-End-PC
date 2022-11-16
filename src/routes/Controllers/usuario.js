const { User } = require("../../db");
const { Orden } = require("../../db");
const { Router } = require("express");
const router = Router();

const getAllUser = async () => {
  try {
    const allUsers = await User.findOne({
      where: { email },
      attributes: ["email"],
    });
    console.log(allUsers);
    return allUsers;
  } catch (error) {
    res.send(error);
  }
};
const postOrden = async (ordenId, emailUser) => {
  try {
    const id = ordenId;
    console.log("ORDEN ID", ordenId);
    const ordenCreate = await Orden.create({
      id: id,
    });
    const UserEmail = await User.findOne({
      where: { email: emailUser },
    });

    await UserEmail.addOrden(ordenCreate);
    return ordenCreate;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postOrden,
  getAllUser,
};
