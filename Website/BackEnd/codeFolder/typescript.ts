const input = require("readline-sync");

const Allepokemon = async () => {
  let pokemonall = await fetch("https://pokeapi.co/api/v2/pokedex/1");
  let data = await pokemonall.json();
  /*   for (let i = 1; i < data.pokemon_entries.length; i++) {
    console.log(data.pokemon_entries[i].pokemon_species.name);
    let pokemonstats = await fetch("https://pokeapi.co/api/v2/pokemon/");
      
  } */
  let pokemonstatsspec = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${data.pokemon_entries[2].pokemon_species.name}`
  );
  let pokemontotalstats = await pokemonstatsspec.json();
  console.log(pokemontotalstats.stats[0].stat.name);
};

Allepokemon();
