import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import SongModel, { createSong } from "./Song";
import bodyParser from "body-parser";
import { getSongs } from "./fileOperations";
import saveSong from "./saveSong";
const cors = require("cors");
dotenv.config();

const app: Express = express();
const port = 3000;
export let apiKey =
  "CFwGYGB4HV1fIKmwz-__v076A_m480QhnaufNjjJaxOnIcSJxucnGwy-tUe9Ru0d";

app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

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
  res.status(200).send({ res: "Odpowiedź na żądanie POST" });
});

app.get("/searchSong/:artist/:title", (req: Request, res: Response) => {
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

app.post("/saveSong", (req: Request, res: Response) => {
  const song = req.body;
  saveSong(song);
  res.send({ xd: "xdf" });
});

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Definicja trasy POST
app.post("/uploadData", (req, res) => {
  const data = req.body;
  res.send({ ad: "dd" });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.get("/getSongs", (req: Request, res: Response) => {
  const o = getSongs();
  res.send(o);
});
