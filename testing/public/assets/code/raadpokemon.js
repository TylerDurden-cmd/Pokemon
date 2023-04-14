const shadow = document.querySelector(".shadow");

const guessInput = document.querySelector("#guess");

const submitBtn = document.querySelector("#submit");

let pokemonName;

fetch("https://pokeapi.co/api/v2/pokemon?limit=1118")

.then(response => response.json())

.then(data => {

const pokemonIndex = Math.floor(Math.random() * data.count) + 1;

return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`);

})

.then(response => response.json())

.then(data => {

pokemonName = data.name;

const imageUrl = data.sprites.front_default;

shadow.style.backgroundImage = `url(${imageUrl})`;

});

function checkGuess() {

const guess = guessInput.value.toLowerCase().trim();

if (guess === pokemonName) {

guessInput.classList.add("correct");

submitBtn.disabled = true;

} else {

guessInput.classList.add("incorrect");
}
}