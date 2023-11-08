import QuestModel from "../models/QuestModel";
import SongModel, { createSong } from "../models/SongModel";
import { getSongs } from "./fileOperations";
import { getAmountOfSongs, getSongById } from "../services/songService";
import { DTO } from "../interfaces/interfaces";
import { stat } from "fs";

export default async function getRandomQuest() {
  const songs = getSongs();
  const length = getAmountOfSongs(songs);
  if (length == 0) {
    return {
      info: { status: false, description: "no are songs saved" },
    } as DTO;
  }
  const index = Math.floor(Math.random() * length);
  const song = getSongById(index, songs);
  if (song == false) {
    return { info: { status: false, description: "song not found" } } as DTO;
  }
  const line = song.lyrics[Math.floor(Math.random() * song.lyrics.length)];
  const quest = new QuestModel(line, song);
  return { info: { status: true, description: "ok" }, quest: quest } as DTO;
}
