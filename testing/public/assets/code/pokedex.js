const searchInput = document.getElementById('search-input');
const pokemonInfo = document.getElementById('pokemon-info');
const pokemonList = document.getElementById('pokemon-list');

searchInput.addEventListener('input', () => {
  const pokemonName = searchInput.value.toLowerCase();

  fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
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
});

searchInput.addEventListener('change', () => {
  const pokemonName = searchInput.value.toLowerCase();

  fetchPokemonData(pokemonName);
});

function fetchPokemonData(pokemonName) {
  pokemonInfo.innerHTML = 'Laden...';

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
    .then(data => {
      pokemonInfo.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}"> 
        <p id="ik">Type: ${data.types.map(type => type.type.name).join(', ')} </p>
        <p>Height: ${data.height / 10} m </p>
        <p>Weight: ${data.weight / 10} kg </p>
      `;

      fetch(data.species.url)
        .then(response => response.json())
        .then(speciesData => {
          fetch(speciesData.evolution_chain.url)
            .then(response => response.json())
            .then(evolutionData => {
              const evolutions = getEvolutions(evolutionData.chain);
              const evolutionsHtml = evolutions.map(evolution => `
                <article>
                  <h3>${evolution.name}</h3>
                  <img src="${evolution.image}" alt="${evolution.name}">
                </article>
              `).join('');

              pokemonInfo.innerHTML += `
                <h3 id="h3evo">Evolutielijn</h3>
                <article class="evolutions">${evolutionsHtml}</article>
              `;
            });
        });
    })
    .catch(error => {
      pokemonInfo.innerHTML = `<p>Pokemon niet gevonden</p>`;
    });
}

function getEvolutions(chain) {
  const evolutions = [];

  if (chain.species) {
    evolutions.push({
      name: chain.species.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${chain.species.url.split('/').slice(-2, -1)}.png`
    });

    if (chain.evolves_to.length > 0) {
      evolutions.push(...getEvolutions(chain.evolves_to[0]));
    }
  }

  return evolutions;
}
