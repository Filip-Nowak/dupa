import QuestModel from "../models/QuestModel";
import SongModel from "../models/SongModel";
export interface GeniusData {
  response: {
    hits: GeniusSong[];
  };
}
export interface DTO {
  info: {
    status: boolean;
    description: string;
  };
  song?: SongModel;
  quest?: QuestModel;
}
export interface GeniusSong {
  result: {
    url: string;
    song_art_image_url: string;
  };
}
