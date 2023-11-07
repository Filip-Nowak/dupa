import SongModel, { createSong } from "../models/SongModel";
import axios from "axios";
const cheerio = require("cheerio-without-node-native");
import {
  addSongToFile,
  containsSong,
  getStringFromTest,
} from "../utils/fileOperations";
import { apiKey } from "../server";
import { DTO, GeniusData } from "../interfaces/interfaces";
export function saveSong(song: SongModel) {
  if (!containsSong(song)) {
    addSongToFile(song);
  }
}

export function getAmountOfSongs(songs: Object) {
  const arr = Object.entries(songs);
  let length = 0;
  arr.forEach((songlist) => {
    length += songlist[1].length;
  });
  return length;
}

export function getSongById(id: number, songs: Object) {
  const songsAsArr = Object.entries(songs);
  let arr: string[][] = [];

  for (let i = 0; i < songsAsArr.length; i++) {
    for (let j = 0; j < songsAsArr[i][1].length; j++) {
      const artist = songsAsArr[i][0];

      arr.push([artist, songsAsArr[i][1][j]]);
    }
  }
  console.log(arr);
  return arr[id];
}

export async function saveMultipleSongs(songsStr: string) {
  //   songsStr = getStringFromTest().trim().toLowerCase();
  //   console.log(songsStr);
  //   const arr = songsStr.split("\n");
  //   let i = 0;
  //   arr.forEach(async (song) => {
  //     if (i == arr.length) return;
  //     let artist: string;
  //     let title: string;
  //     if (song.includes("___")) {
  //       artist = song.split("___-")[0].trim();
  //       title = song.split("___-")[1].trim();
  //     } else {
  //       artist = song.split("-")[0].trim();
  //       title = song.split("-")[1].trim();
  //     }
  //     console.log("artust: " + artist + " " + title);
  //     const s = await createSong(artist, title);
  //     if (s == false) {
  //       console.log("nie znaleziono");
  //       return;
  //     }
  //     await saveSong(s);
  //     i++;
  //   });
}

export async function searchSong(title: string, artist: string) {
  const url =
    "https://api.genius.com/search?q=" +
    encodeURIComponent(getTitle(title, artist)) +
    `&access_token=${apiKey}`;
  let data: DTO = {} as DTO;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  if (!response.ok) {
  }
  const geniusData: GeniusData = await response.json();
  if (geniusData.response.hits.length == 0) {
    data.info = {
      status: false,
      description: "song not found",
    };
    return data;
  }
  data = {
    info: {
      status: true,
      description: "found",
    },
    song: new SongModel(
      title,
      artist,
      geniusData.response.hits[0].result.url,
      formatLyrics(await getLyrics(geniusData.response.hits[0].result.url)),
      geniusData.response.hits[0].result.song_art_image_url
    ),
  };
  return data;
}
const getTitle = (title: string, artist: string) => {
  return `${title} ${artist}`
    .toLowerCase()
    .replace(/ *\([^)]*\) */g, "")
    .replace(/ *\[[^\]]*]/, "")
    .replace(/feat.|ft./g, "")
    .replace(/\s+/g, " ")
    .trim();
};

async function getLyrics(url: string) {
  let { data } = await axios.get(url);
  const $ = cheerio.load(data);
  let lyrics: string = await $('div[class="lyrics"]').text().trim();
  if (!lyrics) {
    lyrics = "";
    $('div[class^="Lyrics__Container"]').each((i: number, elem: string) => {
      if ($(elem).text().length !== 0) {
        let snippet = $(elem)
          .html()
          .replace(/<br>/g, "\n")
          .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, "");
        lyrics += $("<textarea/>").html(snippet).text().trim() + "\n\n";
      }
    });
  }
  return lyrics;
}

function formatLyrics(lyrics: string) {
  const arr: string[] = lyrics.split("\n");
  const toRemove = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "" || arr[i][0] == "[") {
      toRemove.unshift(i);
    }
  }
  for (let i = 0; i < toRemove.length; i++) {
    arr.splice(toRemove[i], 1);
  }
  return arr;
}
