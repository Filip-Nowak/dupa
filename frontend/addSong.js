async function fetchSong(artist, title) {
  console.log("A" + artist + "T" + title);
  const response = await fetch(
    "http://localhost:3000/getSong/" + artist + "/" + title
  );
  const songData = await response.json();
  return songData;
}
async function preview() {
  const artist = document.getElementById("artist").value;
  const title = document.getElementById("title").value;
  const songData = await fetchSong(artist, title);
  //   document.getElementById("artistResult").innerHtml = songData.artist;
  //   document.getElementById("titleResult").innerHtml = songData.title;
  document.getElementById("left").innerHTML =
    "<p>artist: <span class='songInfo' id=`artistResult`>" +
    songData.artist +
    " </span></p><p>title: <span class='songInfo' id='titleResult'>" +
    songData.title +
    "</span></p>";

  document.getElementById("right").innerHTML =
    "<img id='songImg' src='" + songData.imgUrl + "'/>";
  document.getElementById("tekst-piosenki").innerHTML = "";
  for (let i = 0; i < songData.lyrics.length; i++) {
    document.getElementById("tekst-piosenki").innerHTML +=
      songData.lyrics[i] + "<br>";
  }
  console.log(songData);
}
