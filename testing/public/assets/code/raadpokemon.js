const guessInput = document.querySelector("#guess");
const pokemonList = document.getElementById('pokemon-list');
const submitBtn = document.querySelector("#submit");
const nextBtn = document.querySelector("#next");
const shadow = document.querySelector(".shadow");
const pokename = document.querySelector(".name");

guessInput.addEventListener('input', () => {
  const pokemonName = guessInput.value.toLowerCase();

  if (pokemonName.length >= 3) {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=1008`)
    .then(response => response.json())
    .then(data => {
      const filteredPokemon = data.results.filter(pokemon => pokemon.name.startsWith(pokemonName));
      const options = filteredPokemon.map(pokemon => `
        <option value="${pokemon.name}">
          ${pokemon.name}
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)}.png" alt="${pokemon.name}">
        </option>
      `).join('');

      pokemonList.innerHTML = options;
    });
  }
});

const imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
let pokemonName;

function generatePokemon() {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=1008")
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

const checkGuess = ()=> {
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
