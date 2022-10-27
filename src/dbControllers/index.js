const getProcesadoresData = require('./ProcesadorController');
const createMotherBoard = require('./motherBoardController');

const createAll = async () => {
    try {
        await getProcesadoresData();
        await createMotherBoard();
    } catch (error) {
        console.log(error)
    }
}


module.exports = createAll