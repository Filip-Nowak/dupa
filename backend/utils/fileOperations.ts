import * as fs from "fs";
import SongModel from "../models/SongModel";
import path from "path";
const filePath = path.resolve("data/songslist.txt");
const lyricsPath = path.resolve("data/lyrics");
export function getSongs() {
  const output: Record<string, string[]> = {};
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
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

export function containsSong(artist: string, title: string) {
  const songs = getSongs();
  if (artist in songs) {
    console.log(title == songs[artist][0]);

    if (songs[artist].includes(title)) {
      return true;
    }
  }
  return false;
}

export async function addSongToFile(song: SongModel) {
  console.log("====================================");
  console.log(song);
  console.log("====================================");
  const data = fs.readFileSync(filePath, "utf-8");
  fs.writeFileSync(
    filePath,
    data + song.artist + "\n" + song.title + "\n",
    "utf-8"
  );
  const dirName: string = getFileName(song.artist);
  const fileName = (await getFileName(song.title)) + ".txt";
  console.log("=====================================");
  console.log(fileName + ".txt");
  console.log("====================================");
  console.log(lyricsPath + "/" + dirName);
  if (!fs.existsSync(lyricsPath + "/" + dirName)) {
    fs.mkdirSync(path.join(lyricsPath, dirName));
  }
  fs.writeFileSync(
    lyricsPath + "/" + dirName + "/" + fileName,
    JSON.stringify(song),
    "utf-8"
  );
}

export function getStringFromTest() {
  return fs.readFileSync("utils/test.txt", { encoding: "utf-8" });
}
function getFileName(msg: string) {
  if (isValid(msg)) {
    return msg;
  }
  let newName = "";
  for (let i = 0; i < msg.length; i++) {
    if (!isValid(msg[i])) {
      newName += "{forbidden}";
    } else {
      newName += msg[i];
    }
  }
  return newName;
}

var isValid = (function () {
  var rg1 = /^[^\\/:\*\?"<>\| ]+$/; // forbidden characters \ / : * ? " < > |
  var rg2 = /^\./; // cannot start with dot (.)
  var rg3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names
  return function isValid(fname: string) {
    return rg1.test(fname) && !rg2.test(fname) && !rg3.test(fname);
  };
})();

export function getSongFromFile(artist: string, title: string) {
  if (!containsSong(artist, title)) {
    return false;
  }
  const fileDir =
    lyricsPath +
    "\\" +
    getFileName(artist) +
    "\\" +
    getFileName(title) +
    ".txt";
  const data = getFileData(fileDir);
  console.log();
  return JSON.parse(data) as SongModel;
}
function getFileData(fileDir: string) {
  return fs.readFileSync(fileDir, { encoding: "utf-8" });
}

export function deleteFiles() {
  fs.rmSync(lyricsPath, { recursive: true, force: true });
  fs.mkdirSync(path.join(path.resolve("data"), "lyrics"));
  fs.writeFileSync(filePath, "", "utf-8");
}
