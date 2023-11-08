import { Request, Response } from "express";
import { deleteFiles, getSongs } from "../utils/fileOperations";
import { createSong } from "../models/SongModel";
import {
  saveMultipleSongs,
  saveSong,
  searchSong,
} from "../services/songService";
import getRandomQuest from "../utils/getRandomQuest";

async function testController(req: Request, res: Response) {
  console.log("to jest controller");
  res.send("test");
}
async function getSongsController(req: Request, res: Response) {
  const o = getSongs();
  res.send(o);
}
async function searchSongController(req: Request, res: Response) {
  const artist = req.params.artist;
  const title = req.params.title;
  const response = await searchSong(artist, title);
  res.send(response);
}
async function saveSongController(req: Request, res: Response) {
  const artist: string = req.body.artist;
  const title: string = req.body.title;
  console.log(artist + ":" + title);
  const response = await saveSong(artist, title);
  res.send(response);
}
async function getQuestController(req: Request, res: Response) {
  const response = await getRandomQuest();
  res.send(response);
}
async function deleteController(req: Request, res: Response) {
  deleteFiles();
  res.send("xd");
}
async function saveMultipleSongsController(req: Request, res: Response) {
  const response = await saveMultipleSongs("");
  res.send("dupa");
}
export {
  testController,
  getSongsController,
  searchSongController,
  saveSongController,
  getQuestController,
  deleteController,
  saveMultipleSongsController,
};
