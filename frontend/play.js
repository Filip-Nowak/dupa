let currentQuest;
async function nextQuest() {
  const quest = getRandomQuest();
}
async function getRandomQuest() {
  const response = await fetch("http://localhost:3000/getQuest");
  const data = await response.json();
  if (!data.info.status) {
    console.log(data.info.description);
    return;
  }
  currentQuest = data.quest;
  document.getElementById("fragment-tekstu").innerHTML = currentQuest.text;
  document.getElementById("artistHint").innerHTML =
    "Autor: <button id='artistHintButton' onclick='showHint()'>odkryj</button>";
}
function showHint() {
  document.getElementById("artistHint").innerHTML =
    "Autor: " + currentQuest.song.artist;
}
function checkAnswer() {
  const answer = document.getElementById("tekst").value.toLowerCase();
  if (answer == currentQuest.song.title) {
    console.log("win");
  } else {
    console.log("chuj ci w dupe");
  }
}
function forfeit() {
  console.log(currentQuest.song.title);
}
