import * as fs from "fs";
import SongModel from "../models/SongModel";
export function getSongs() {
  const output: Record<string, string[]> = {};
  const data = fs.readFileSync("data/songlist.txt", { encoding: "utf-8" });
  const lines = data.split("\n");
  for (let i = 0; i < lines.length - 1; i++) {
    if (i % 2 == 0) {
      if (!(lines[i] in output)) {
        output[lines[i]] = [];
      }
    } else {
      output[lines[i - 1]].push(lines[i]);
    }
  }
  return output;
}

export function containsSong(song: SongModel) {
  const songs = getSongs();
  if (song.artist in songs) {
    console.log(song.title == songs[song.artist][0]);

    if (songs[song.artist].includes(song.title)) {
      return true;
    }
  }
  return false;
}

export function addSongToFile(song: SongModel) {
  const data = fs.readFileSync("data/songlist.txt", "utf-8");
  fs.writeFileSync(
    "data/songlist.txt",
    data + song.artist + "\n" + song.title + "\n",
    "utf-8"
  );
}

export function getStringFromTest() {
  return fs.readFileSync("test.txt", { encoding: "utf-8" });
}
