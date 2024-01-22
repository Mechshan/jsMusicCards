// All of our data is available on the global `window` object.
const { artists, songs } = window;

document.addEventListener("DOMContentLoaded", contentLoad);

function contentLoad() {
  //populate nav
  const navMenu = document.querySelector("#menu");
  artists.forEach((artist) => navMenu.appendChild(createButton(artist)));
  //load first artist by def
  displayArtist(artists[0]);
}

function createButton(artist) {
  const button = document.createElement("button");

  // Set the label of the button to the artist's name
  button.textContent = artist.name;

  // click event listener to the button
  button.addEventListener("click", () => {
    displayArtist(artist);
  });

  return button;
}

function displayArtist(artist) {
  const artistHeader = document.querySelector("#selected-artist");
  const cardGrid = document.querySelector(".grid-container");

  //Set the header with artist web links

  const linksText = [];

  for (let i = 0; i < artist.links.length; i++) {
    const link = artist.links[i];

    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.name;

    linksText.push(a.outerHTML);
  }
  artistHeader.innerHTML = artist.name + " (" + linksText.join(", ") + ")";

  //clear table
  //songsTable.innerHTML = "";
  cardGrid.innerHTML = "";

  //filter songs
  const filteredSongs = songs.filter(
    (song) => song.artistId === artist.id && song.flagged === false
  );

  //populate the card grid
  filteredSongs.forEach((song) => cardGrid.appendChild(createSongCard(song)));
}

function createSongCard(song) {
  // Create a <div> to hold the card
  const card = document.createElement("div");
  // Add the .card class to the <div>
  card.classList.add("card");

  // Create a song image, use the .card-image class
  const songImg = document.createElement("img");
  songImg.src = song.imageUrl;
  songImg.classList.add("card-image");
  card.appendChild(songImg);

  const songHeader = document.createElement("h3");
  songHeader.textContent = song.title;
  card.appendChild(songHeader);

  const songYear = document.createElement("time");
  songYear.textContent = songYear.dateTime = song.year;

  card.appendChild(songYear);

  const songDuration = document.createElement("span");
  songDuration.textContent =
    Math.floor(parseFloat(song.duration) / 60)
      .toString()
      .padStart(2, "0") +
    ":" +
    (parseFloat(song.duration) % 60).toString().padStart(2, "0");

  card.appendChild(songDuration);

  // Return the card’s <div> element to the caller
  return card;
}
