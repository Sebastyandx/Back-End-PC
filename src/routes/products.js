const {Router} = require('express')
const {Producto} = require('../db')
const router = Router();

router.get("", async (req, res) => {
    try {
        const {name} = req.query
        if(name) {
            const findByName = await Producto.findOne({where: name})
            res.status(200).json(findByName)
        } 
        const filters = req.query
        if(filters) {
            const allProducts = await Producto.findAll()
            const filteredProducts = allProducts.filter(elem => {
                let isValid = true;
                for(key in filters) {
                    // console.log(key, elem[key], filters[key]);
                    isValid = isValid && elem[key].toString() === filters[key]
                }
                return isValid
            })
            res.json(filteredProducts)
        } else {
            const allProducts = await Producto.findAll();
            res.json(allProducts)
        }
    } catch (error) {
        res.json(error)
    }

    
}); 


router.get('/:id', async (req,res) => {
    const {id} = req.params;
    try {
        const detailProduct = await Producto.findByPk(id)
        res.json(detailProduct)
    } catch (error) {
        res.json(error)
    }
})

router.post("", async(req, res) => {

    const {name, brand, img, details, cost, type} = req.body;
    try {
        const productCreate = await Producto.create({
            brand, name, cost, img, details, type
          });
        res.json(productCreate);
    } catch (error) {
        res.send(error)
    }
})

router.put("", async (req, res) => {
    
    const {name, brand, img, details, cost, type} = req.body;
    const {id} = req.query
    try {
        const productSelected = await Producto.findByPk(id)
        await productSelected.update({name, brand, img, details, cost, type})
        res.status(200).json(`${productSelected} actualiizado`)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params
    try {
        const whatProduct = await Producto.findByPk(id)
        await Producto.destroy({where: id})
        res.json(`Producto ${whatProduct} eliminado`)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router




