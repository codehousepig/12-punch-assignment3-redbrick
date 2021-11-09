import express from "express";
const router = express.Router();
// import gameDev from "../controllers/gameDevelopment";
const gameDev = require("../controllers/gameDevelopment")

router.route('/:id').get(gameDev.test); // get game

router.route('/').get(gameDev.findAll); // get game
router.route('/').post(gameDev.create); // create game
router.route('/:id').patch(gameDev.update); // create game
router.route('/').delete(gameDev.hardDelete); // create game

export default router;