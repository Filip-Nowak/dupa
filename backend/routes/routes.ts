import * as express from "express";
import {
  deleteController,
  getQuestController,
  getSongsController,
  saveMultipleSongsController,
  saveSongController,
  searchSongController,
  testController,
} from "../controllers/controllers";
import { saveMultipleSongs } from "../services/songService";

const router = express.Router();
router.get("/test", testController);
router.get("/getSongs", getSongsController);
router.get("/searchSong/:artist/:title", searchSongController);
router.post("/saveSong", saveSongController);
router.get("/getQuest", getQuestController);
router.get("/saveMultipleSongs", saveMultipleSongsController);
router.get("/reset", deleteController);
export { router };
