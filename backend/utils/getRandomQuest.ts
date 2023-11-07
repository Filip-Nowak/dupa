import QuestModel from "../models/QuestModel";
import SongModel, { createSong } from "../models/SongModel";
import { getSongs } from "./fileOperations";
import { getAmountOfSongs, getSongById } from "./saveSong";

export default async function getRandomQuest() {
  const songs = getSongs();
  const length = getAmountOfSongs(songs);
  const index = Math.floor(Math.random() * length);
  console.log(index);
  //const song=getSongById();
  const songInfo: string[] = getSongById(index, songs);
  const song = await createSong(songInfo[0], songInfo[1]);
  if (song != false) {
    const line = song.lyrics[Math.floor(Math.random() * song.lyrics.length)];
    const quest = new QuestModel(line, song);
    //console.log(quest);
    return quest;
  }
  return { error: "nei znaleziono" };
}
