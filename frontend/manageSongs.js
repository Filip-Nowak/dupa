const list = document.getElementById("songslist");
async function loadSongs() {
  document.getElementById("songslist").innerHTML = "";
  const response = await fetch("http://localhost:3000/getSongs");
  const songs = await response.json();
  const arr = Object.entries(songs);
  for (const [artist, titles] of arr) {
    titles.forEach((title) => {
      document.getElementById("songslist").innerHTML +=
        "<li>" + artist + ": " + title + "</li>";
    });
  }
}
