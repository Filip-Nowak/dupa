import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import SongModel, { createSong } from "./Song";

dotenv.config();

const app: Express = express();
const port = 3000;
export let apiKey =
  "CFwGYGB4HV1fIKmwz-__v076A_m480QhnaufNjjJaxOnIcSJxucnGwy-tUe9Ru0d";
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.get("/", (req: Request, res: Response) => {
  res.send("chuj + TypeScript Server");
});
app.get("/xdd", (req: Request, res: Response) => {
  let song: SongModel | false;
  createSong("Quebonafide", "Candy");
});
app.post("/postxdd", (req: Request, res: Response) => {
  const postData = req.body;
  console.log("Dane otrzymane w żądaniu POST:", postData);
  res.status(200).send("Odpowiedź na żądanie POST");
});

app.get("/getSong/:artist/:title", (req: Request, res: Response) => {
  const artist = req.params.artist;
  const title = req.params.title;
  console.log("a: " + artist + " t: " + title);
  createSong(artist, title).then((result) => {
    if (result == false) {
      res.send("song not found");
    } else {
      res.send(result);
    }
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
