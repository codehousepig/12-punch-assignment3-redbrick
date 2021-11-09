import express from "express";
const router = express.Router();
import gameDev from "../controllers/gameDev";

// GET game according to user
// POST code
// PATCH code
// DELETE code

router.route('/').get(gameDev.test);

export default router;