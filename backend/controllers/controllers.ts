import { Request, Response } from "express";
import { getSongs } from "../utils/fileOperations";
import { createSong } from "../models/SongModel";
import { searchSong } from "../services/songService";

async function testController(req: Request, res: Response) {
  console.log("to jest controller");
  res.send("test");
}
async function getSongsController(req: Request, res: Response) {
  const o = getSongs();
  res.send(o);
}
async function searchSongController(req: Request, res: Response) {
  // const artist = req.params.artist;
  // const title = req.params.title;
  // console.log("a: " + artist + " t: " + title);
  // createSong(artist, title).then((result) => {
  //   if (result == false) {
  //     res.send("song not found");
  //   } else {
  //     res.send(result);
  //   }
  // });
  const artist = req.params.artist;
  const title = req.params.title;
  const response = await searchSong(artist, title);
  res.send(response);
}
export { testController, getSongsController, searchSongController };
