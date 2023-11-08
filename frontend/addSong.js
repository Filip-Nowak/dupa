let selectedSong = null;

async function fetchSong(artist, title) {
  console.log("A" + artist + "T" + title);
  const response = await fetch(
    "http://localhost:3000/searchSong/" +
      artist.toLowerCase() +
      "/" +
      title.toLowerCase()
  );
  console.log(
    "http://localhost:3000/searchSong/" +
      artist.toLowerCase() +
      "/" +
      title.toLowerCase()
  );
  const songData = await response.json();
  return songData;
}

async function preview() {
  const artist = document.getElementById("artist").value.toLowerCase();
  const title = document.getElementById("title").value.toLowerCase();
  const songData = await fetchSong(artist, title);
  console.log(songData);
  if (!songData.info.status) {
    console.log("nie udalo sie znalesc");
    return;
  }
  const song = songData.song;
  document.getElementById("left").innerHTML =
    "<p>artist: <span class='songInfo' id=`artistResult`>" +
    song.artist +
    " </span></p><p>title: <span class='songInfo' id='titleResult'>" +
    song.title +
    "</span></p>";

  document.getElementById("right").innerHTML =
    "<img id='songImg' src='" + song.imgUrl + "'/>";
  document.getElementById("tekst-piosenki").innerHTML = "";
  for (let i = 0; i < song.lyrics.length; i++) {
    document.getElementById("tekst-piosenki").innerHTML +=
      song.lyrics[i] + "<br>";
  }
  console.log(song);
  selectedSong = song;
}

async function addSong() {
  if (selectedSong != null) {
    const response = await fetch("http://localhost:3000/saveSong", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        artist: selectedSong.artist,
        title: selectedSong.title,
      }),
    });
    console.log(await response.json());
  } else {
    console.log("nie wybrano pisoenki");
  }
}
