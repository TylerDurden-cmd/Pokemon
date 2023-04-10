import fetch from 'node-fetch';
import express from "express";

const input = require("readline-sync");
const app = express();

//functie voor het uitschrijven van alle pokemon namen in de terminal
/*const Allepokemon = async () => {
  let pokemonall = await fetch("https://pokeapi.co/api/v2/pokedex/1");
  let data = await pokemonall.json();
  let PokemonNameArray: string[] = [];
  let PokemonStats: string[] = [];
  let PokemonstatsNum: string[] = [];

  for (let i = 1; i < data.pokemon_entries.length; i++) {
    PokemonNameArray[i] = data.pokemon_entries[i].pokemon_species.name;
  }

  for (let i = 1; i < PokemonNameArray.length; i++) {
    console.log(PokemonNameArray[i]);
    let pokemonUrl = await (
      await fetch(
        `https://pokeapi.co/api/v2/pokemon/${data.pokemon_entries[i].pokemon_species.name}`
      )
    ).json();

    for (let index = 0; index < pokemonUrl.stats.length; index++) {
      //console.log(pokemonUrl.stats[index].stat.name);
      //console.log(pokemonUrl.stats[index].base_stat); 
      PokemonStats[index] = pokemonUrl.stats[index].stat.name;
      PokemonstatsNum[index] = pokemonUrl.stats[index].base_stat;

      console.log(
        `${pokemonUrl.stats[index].stat.name}: ${pokemonUrl.stats[index].base_stat}`
      );
    }

  }
};*/
//Allepokemon();

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
  ); 
*/

/* let pokemontotalstats = await pokemonstatsspec.json();
  console.log(pokemontotalstats.stats[0].stat.name); 
*/

const PokemonAll = async () =>{
  let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
  let data = await response.json();
  return data;
};

const PokemonNames = async () => {
let pokemonall = await PokemonAll();
let data = await PokemonAll();
let PokemonNameArray: string[] = [];

for (let i = 1; i < data.length; i++) {
  PokemonNameArray[i] = data.pokemon_entries[i].pokemon_species.name;
}
return PokemonNameArray;
};

const PokemonStatsNames = async () =>{
  let data = await PokemonAll();
  let PokemonNameArray = await PokemonNames();
  let PokemonStats: string[] = [];

  for (let i = 1; i < PokemonNameArray.length; i++) {
    let pokemonUrl = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${data.pokemon_entries[i].pokemon_species.name}`)).json();
    for (let index = 0; index < pokemonUrl.stats.length; index++) {   
      PokemonStats[index] = pokemonUrl.stats[index].stat.name;
     
    }
  }
  return PokemonStats;
};

const PokemonStatsNumbers = async () =>{
  let data = await PokemonAll();
  let PokemonNameArray = await PokemonNames();
  let PokemonStatsNum: number[] = [];
  for (let i = 1; i < PokemonNameArray.length; i++) {
    let pokemonUrl = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${data.pokemon_entries[i].pokemon_species.name}`)).json();
    for (let index = 0; index < pokemonUrl.stats.length; index++) {   
      PokemonStatsNum[index] = pokemonUrl.stats[index].base_stat;
    }
  }
  return PokemonStatsNum;
};

app.set("port",3000);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/comparer", async(req, res) => {
  res.render("pokeComparer", {pokeNames: await PokemonNames(), pokeStatsNames: await PokemonStatsNames(), pokeStatsNumbers: await PokemonStatsNumbers()});
});

app.listen(app.get("port"), () =>
  console.log("[server] http://localhost:" + app.get("port"))
);

export{};