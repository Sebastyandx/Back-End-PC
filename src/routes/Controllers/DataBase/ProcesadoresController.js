const axios = require("axios");
const e = require("express");
const { Router } = require('express');
const router = Router();
const {Procesador} = require('../../../db')

const getDBproces = async (id) =>{
  try{
    if(id){
      const oneProcess = await Procesador.findAll({
        where: {id:id}
      })
      return oneProcess
    }else{
      const allProcess = await Procesador.findAll()
      return allProcess
    }
  }catch(err){
    return err
  }
}

router.get(`/procesadores`, async (req,res)=>{
  const {id} = req.query;
  try{
    if(id){
      let procesador = await getDBproces(id)
      return res.status(200).send(procesador)
    } 
    else{
      let todos = await getDBproces()
      return res.status(200).send(todos)
    }
  }
  catch(err){
    return res.status(200).send(err)
  }
})

module.exports = router;