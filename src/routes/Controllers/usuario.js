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
const postOrden = async (emailUser, lineItems) => {
  try {
    const data = lineItems;
    const email = emailUser;
    const ordenCreate = await Orden.create({
      data: data,
      email: email,
    });
    return ordenCreate;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postOrden,
  getAllUser,
};
