import { listenerCount } from "process";
import { searchSong } from "../services/songService";
import { apiKey } from "../server";
import axios from "axios";
const cheerio = require("cheerio-without-node-native");
export default class SongModel {
  title: string;
  artist: string;
  lyrics: string[];
  url: string = "";
  imgUrl: string = "";
  constructor(
    title: string,
    artist: string,
    url: string,
    lyrics: string[],
    imgUrl: string
  ) {
    this.title = title;
    this.artist = artist;
    this.url = url;
    this.lyrics = lyrics;
    this.imgUrl = imgUrl;
  }
}

async function getLyrics(url: string) {
  let { data } = await axios.get(url);
  const $ = cheerio.load(data);
  let lyrics = $('div[class="lyrics"]').text().trim();
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
export async function createSong(artist: string, title: string) {
  //const song = new Song(title, artist);
  // let song = await searchSong(title, artist);
  // if (song == false) {
  //   console.log("nie znaleziono");
  //   return false;
  // } else {
  //   const lyrics = await getLyrics(song.response.hits[0].result.url);
  //   return new SongModel(
  //     title,
  //     artist,
  //     song.response.hits[0].result.url,
  //     formatLyrics(lyrics),
  //     song.response.hits[0].result.song_art_image_url
  //   );
  // }
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
