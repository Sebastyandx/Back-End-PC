const {Procesador} = require('../../db');

module.exports = {
    getDBproces: async (id) =>{
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
}
