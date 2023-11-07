import SongModel from "./SongModel";

export default class QuestModel {
  text: string;
  song: SongModel;
  constructor(text: string, song: SongModel) {
    this.text = text;
    this.song = song;
  }
}
