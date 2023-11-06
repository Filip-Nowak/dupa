import * as fs from "fs";
import SongModel from "./Song";
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
  fs.readFile("data/songlist.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    fs.writeFile(
      "data/songlist.txt",
      data + song.artist + "\n" + song.title + "\n",
      "utf-8",
      (err) => {
        if (err) {
          console.error("Błąd zapisu pliku:", err);
          return;
        }
      }
    );
  });
}
