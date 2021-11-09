import gameDevRepo from "../repositories/gameDevelopment";

const test = async (req, res, next) => {
  console.log('controller Test')
  try {
    const dirName = '/home/tech/coding/wanted/12-punch-assignment3-redbrick/front/gameDevelopment.html'
    res.sendFile(dirName)
  } catch (e) {
    next(e);
  }
};

const findAll = async (req, res, next) => {
  console.log('controller findAll')
  try {
    let params = {
      name: req.query.name,
      offset: req.query.offset || 0,
      limit: req.query.limit || 0
    }
    let game = await gameDevRepo.findAll(params);
    res.send(game)
    return game;
  } 
  
  catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  console.log('controller Create')
  try {
    const newGame = req.body;
    newGame.user = req.user;

    let saveNewGame = await gameDevRepo.create(newGame);
    console.log('saveNewGame', saveNewGame)
    return saveNewGame;
  } 
  
  catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  console.log('controller Update')
  try {
    const _id = req.params.id;
    let params = {
      code: req.body.code
    };
    
    console.log('updated', _id, params)
    const updatedGame = await gameDevRepo.update(_id, params);
    res.json(updatedGame);
  } 
  
  catch (e) {
    next(e);
  }
};

const updateRealTime = async (msg) => {
  console.log('controller Update')
  try {
    
    const updatedGame = await gameDevRepo.update(_id, { code: msg });
    res.json(updatedGame);
  } 
  
  catch (e) {
    next(e);
  }
};

const hardDelete = async (req, res, next) => {
  console.log('controller HardDelete')
  try {
    const gameList = await findAll(req, res, next);
    const gameToBeDeleted = gameList.find(x => x.name === req.query.name)
    
    const deletedGame = await gameDevRepo.hardDelete(gameToBeDeleted._id)
    return deletedGame;
  } 
  
  catch (e) {
    next(e);
  }
};

// export default { test, create, update, hardDelete, findAll };
module.exports = { test, create, update, hardDelete, findAll };