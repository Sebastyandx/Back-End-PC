const axios = require('axios');
const { Procesadores } = require("../../models/Procesadores");

const getProcessInfo = async () => {    
    
        const DbProcesadores = await Procesadores.findAll({
            atributes:["id", "name", "brand", "img","details","cost"]
        })
        let obj = {}
        for(let i=0 ; i< Procesadores.length; i++){
            obj ={
                modelo : Procesadores[i].details.Modelo,
                socket : Procesadores[i].details.Socket,
                nucelos : Procesadores[i].details.Núcleos,
                frecuencia: Procesadores[i].details.Frecuencia,
                proceso_de_fabricacion : Procesadores[i].details.Proceso_De_Fabricación,
                chipset_gpu: Procesadores[i].details.Chipset_Gpu,
                hilos: Procesadores[i].details.Hilos,
                Frecuencia_Turbo: Procesadores[i].details.Frecuencia_Turbo
            }
            console.log(obj)
        }

    

}