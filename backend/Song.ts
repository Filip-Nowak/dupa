import searchSong from "./searchSong";
import { apiKey } from "./server";
import axios from "axios";
const cheerio = require("cheerio-without-node-native");
export default class Song {
  title: string;
  artist: string;
  lyrics: string = "";
  url: string = "";
  constructor(title: string, artist: string, url: string) {
    this.title = title;
    this.artist = artist;
    this.url = url;
  }
  async getLyrics() {
    if (this.lyrics == "") {
      const response = await fetch(this.url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }).then((v) => {
        console.log(v.text());
      });

      let { data } = await axios.get(this.url);
      //console.log(data);
      const $ = cheerio.load(data);
      let lyrics = $('div[class="lyrics"]').text().trim();
      //console.log(lyrics);
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
      this.lyrics = lyrics;
      return lyrics;
    } else {
      return this.lyrics;
    }
  }
}
export async function createSong(title: string, artist: string) {
  //const song = new Song(title, artist);
  let song = await searchSong(title, artist);
  if (song == false) {
    console.log("nie znaleziono");
    return false;
  } else {
    return new Song(title, artist, song.response.hits[0].result.url);
  }
}
