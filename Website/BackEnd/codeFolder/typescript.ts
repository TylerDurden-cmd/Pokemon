import fetch from 'node-fetch';
import express from "express";
const app = express();

//FUNCTIES

//haalt de namen van de stats op (maakt niet uit van welke pokemon het komt)
const PokemonStatsNames = async () =>{
  let PokemonStatsNames = [];
  let pokemonUrl = await (await fetch(`https://pokeapi.co/api/v2/pokemon/1`)).json();

  for (let index = 0; index < pokemonUrl.stats.length; index++) {   
      PokemonStatsNames[index] = pokemonUrl.stats[index].stat.name;       
  }

  return PokemonStatsNames;
};
//adhv de index van de pokemon haalt het de stats (getallen) op
const PokemonStatsNumbers = async () =>{
  let PokemonStatsNum = [];
  let pokemonUrl = await (await fetch(`https://pokeapi.co/api/v2/pokemon/1`)).json();

  for (let index = 0; index < pokemonUrl.stats.length; index++) {   
      PokemonStatsNum[index] = pokemonUrl.stats[index].base_stat;
  }

  return PokemonStatsNum;
};

//functie voor het vragen van de url zodat je de functie maar hoeft op te roepen en direct aan de slag kan gaan met het toevoegen van volgende data.
const PokemonFetcher = async () => {
  const pokemonurl = await fetch("https://pokeapi.co/api/v2/pokedex/1");
  const data = await pokemonurl.json();
  return data;
};

/* pokemonsetter is een functie voor het uitprinten van pokemonnamen je mag de naam origineler maken geen console.log omdat er niets word afgeprint in de terminal alleen return 
waarde voor deze mee te geven aan de website.
 */
const PokemonSetter = async () => {
  const PokemonNameArray: string[] = [];
  let data = await PokemonFetcher();
  for (let i = 0; i < data.pokemon_entries.length; i++) {
    PokemonNameArray[i] = data.pokemon_entries[i].pokemon_species.name;
  }

  return PokemonNameArray;
};

const PokemonLength = async () => {
  const pokemonawait = await PokemonFetcher();
  return pokemonawait.pokemon_entries.length;
};

//WEBSITE

/* spreekt voor zichzelf start op poort 3000 */
app.set("port", 3000);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

//hier werd async gebruikt voor de waarde op te wachten want de functie is asynchroon
app.get("/comparer", async (req, res) => {
  const statNames = await PokemonStatsNames();
  const statNumbers = await PokemonStatsNumbers();
  const pokemonArray = await PokemonSetter();
  const pokemonlength = await PokemonLength();
  res.render("pokeComparer", {
    pokemonarray: pokemonArray,
    pokemonlength: pokemonlength,
    statnames: statNames,
    statnumbers: statNumbers
  });
});

app.listen(app.get("port"), () => {
  console.log("[server]http://localhost:" + app.get("port"));
});


//Allepokemon functie deze werd gebruikt als referentie.

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

export{};