const guessInput = document.querySelector("#guess");
const submitBtn = document.querySelector("#submit");
const nextBtn = document.querySelector("#next");
const shadow = document.querySelector(".shadow");
const pokename = document.querySelector(".name");

const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
let pokemonName;

function generatePokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=1118")
    .then(response => response.json())
    .then(data => {
      const pokemonIndex = Math.floor(Math.random() * data.count) + 1;
      return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`);
    })
    .then(response => response.json())
    .then(data => {
      pokemonName = data.name;
      const image = document.createElement("img");
      image.src = `${imageUrl}${data.id}.png`;
      shadow.innerHTML = "";
      shadow.appendChild(image);
      guessInput.value = "";
      guessInput.classList.remove("correct", "incorrect");
      submitBtn.disabled = false;
      pokename.innerHTML = "";
    });
}

function checkGuess() {
  const guess = guessInput.value.toLowerCase().trim();
  if (guess === pokemonName) {
    guessInput.classList.add("correct");
    submitBtn.disabled = true;
  } else {
    guessInput.classList.add("incorrect");

    pokename.innerHTML = pokemonName;
  }

  shadow.getElementsByTagName("img")[0].style.filter = "brightness(1)";
  submitBtn.disabled = true;
}

submitBtn.addEventListener("click", {once:true}, checkGuess);
nextBtn.addEventListener("click", generatePokemon);

generatePokemon();
  