const input = require("readline-sync");

//script 1.
//functie voor het uitschrijven van alle pokemon namen
const Allepokemon = async () => {
  let pokemonall = await fetch("https://pokeapi.co/api/v2/pokedex/1");
  let data = await pokemonall.json();
  let PokemonArray: string[] = [];
  let PokemonStats: string[] = [];
  let PokemonstatsNum: string[] = [];
  for (let i = 1; i < data.pokemon_entries.length; i++) {
    PokemonArray[i] = data.pokemon_entries[i].pokemon_species.name;
  }
  for (let i = 1; i < PokemonArray.length; i++) {
    console.log(PokemonArray[i]);
    let pokemonUrl = await (
      await fetch(
        `https://pokeapi.co/api/v2/pokemon/${data.pokemon_entries[i].pokemon_species.name}`
      )
    ).json();

    for (let index = 0; index < pokemonUrl.stats.length; index++) {
      /* console.log(pokemonUrl.stats[index].stat.name);
      console.log(pokemonUrl.stats[index].base_stat); */
      PokemonStats[index] = pokemonUrl.stats[index].stat.name;
      PokemonstatsNum[index] = pokemonUrl.stats[index].base_stat;

      console.log(
        `${pokemonUrl.stats[index].stat.name}: ${pokemonUrl.stats[index].base_stat}`
      );
    }
  }
};

Allepokemon();

//Code die Niet word gebruikt

/* const Allestats = async (Allepokemon: Function) => {
  const pokestatsfetch = await fetch("https://pokeapi.co/api/v2/pokemon/");
  let pokestatsall = await fetch(`${pokestatsfetch}${Allestats}`);
  let pokestatsoutput = await pokestatsall.json();
  console.log(pokestatsall);
};
 */

/* console.log(data.pokemon_entries[i].pokemon_species.name); */

//let pokemonstats = await fetch("https://pokeapi.co/api/v2/pokemon/");

/*   let pokemonstatsspec = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${data.pokemon_entries[2].pokemon_species.name}`
  ); */

/* let pokemontotalstats = await pokemonstatsspec.json();
  console.log(pokemontotalstats.stats[0].stat.name); */
