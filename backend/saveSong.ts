import SongModel from "./Song";
import { addSongToFile, containsSong } from "./fileOperations";

export default function saveSong(song: SongModel) {
  if (!containsSong(song)) {
    addSongToFile(song);
  }
}
