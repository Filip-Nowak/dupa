import * as express from "express";
import {
  getSongsController,
  searchSongController,
  testController,
} from "../controllers/controllers";

const router = express.Router();
router.get("/test", testController);
router.get("/getSongs", getSongsController);
router.get("/searchSong/:artist/:title", searchSongController);
router.post("saveSong");
router.get("/getQuest");
router.post("/saveMultipleSongs");
export { router };
