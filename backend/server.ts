import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Song, { createSong } from "./Song";

dotenv.config();

const app: Express = express();
const port = 3000;
export let apiKey =
  "CFwGYGB4HV1fIKmwz-__v076A_m480QhnaufNjjJaxOnIcSJxucnGwy-tUe9Ru0d";
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("chuj + TypeScript Server");
});
app.get("/xdd", (req: Request, res: Response) => {
  let song: Song | false;
  createSong("taconafide", "tamagotchi remix").then((v) => {
    song = v;
    if (song instanceof Song) {
      song.getLyrics().then((v) => res.send(v));
    } else {
      res.send("nie znaleziono");
    }
  });
});
app.post("/postxdd", (req: Request, res: Response) => {
  const postData = req.body;
  console.log("Dane otrzymane w żądaniu POST:", postData);
  console.log(postData.xd);
  // Tutaj możesz wykonać dowolne operacje na danych i udzielić odpowiedzi
  res.status(200).send("Odpowiedź na żądanie POST");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
