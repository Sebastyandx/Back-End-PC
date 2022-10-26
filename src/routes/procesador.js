const { Router } = require('express');
const router = Router();


const { getDBproces } = require('./Controllers/ProcessorController')

router.get('', async (req,res)=>{
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