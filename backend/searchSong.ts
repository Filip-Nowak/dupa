import SongModel from "./Song";
import { apiKey } from "./server";
import axios from "axios";
interface hit {
  result: {
    url: string;
    song_art_image_url: string;
  };
}
interface Data {
  response: {
    hits: hit[];
  };
}
export default async function searchSong(title: string, artist: string) {
  const url =
    "https://api.genius.com/search?q=" +
    encodeURIComponent(getTitle(title, artist)) +
    `&access_token=${apiKey}`;
  let data: Data;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Błąd żądaniaz");
    }
    data = await response.json();
  } catch (e) {
    throw e;
  }
  if (data.response.hits.length == 0) {
    return false;
  }
  //const strData: string = JSON.stringify(data);
  //console.log("data: " + strData);
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
