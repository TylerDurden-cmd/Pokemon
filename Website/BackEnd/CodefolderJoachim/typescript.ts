//FOLDER NIET VERWIJDEREN.
//hehe sorry voor zo veel folders te maken ik vond het makkelijker om met een lege folder te werke tehee (*/ω＼*).
import express from "express";
const app = express();

//FUNCTIES

//functie voor het vragen van de url zodat je de functie maar hoeft op te roepen en direct aan de slag kan gaan met het toevoegen van volgende data.
const PokemonFetcher = async () => {
  const pokemonurl = await fetch("https://pokeapi.co/api/v2/pokedex/1");
  const data = await pokemonurl.json();
  return data;
};

//prints data from the pokemon url.
const PokemonAssetsFetcher = async () => {
  const pokemonAssetUrl = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await pokemonAssetUrl.json();
  return data;
};

/* pokemonsetter is een functie voor het uitprinten van pokemonnamen je mag de naam origineler maken geen console.log omdat er niets word afgeprint in de terminal alleen return 
waarde voor deze mee te geven aan de website.
 */
const pokemonSetter = async () => {
  const PokemonNameArray: string[] = [];
  let data = await PokemonFetcher();
  for (let i = 0; i < data.pokemon_entries.length; i++) {
    PokemonNameArray[i] = data.pokemon_entries[i].pokemon_species.name;
  }

  return PokemonNameArray;
};

//returns de length of pokemon.
const pokemonelength = async () => {
  const pokemonawait = await PokemonFetcher();
  return pokemonawait.pokemon_entries.length;
};

//pokemonsetter word gebruikt om alle namen random te genereren.

//pokemonpicture test for ditto is een functie voor het uittesten van de url sprite ditto.
const PokemonPictureFunctionDitto = async () => {
  const url = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const urlJson = await url.json();
  console.log(urlJson.sprites.back_default);
};

/* PokemonPictureFunction(); */

//pokemonPictureforanypokemon

const PokemonPictureFunction = async (Pokemonvariable: string) => {
  const url = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${Pokemonvariable}`
  );
  const urlJson = await url.json();
  /* console.log(urlJson.sprites.back_default); */
  return urlJson.sprites.front_default;
};
/* 
  PokemonPictureFunction("pikachu");
  */

//functie voor random pokemon te kiezen.
const RandomPokemonGenerator = async () => {
  let data = await PokemonFetcher();
  const pokemonArray: string[] = [];
  for (let i = 0; i < data.pokemon_entries.length; i++) {
    pokemonArray[i] = data.pokemon_entries[i].pokemon_species.name;
  }
  const RandomPokemonindex = Math.floor(
    Math.random() * data.pokemon_entries.length
  );
  /* console.log(pokemonArray[RandomPokemonindex]); */
  return pokemonArray[RandomPokemonindex];
};

const Sixpicturesreturner = async () => {
  for (let i = 0; i < 6; i++) {
    RandomPokemonGenerator()
      .then((randomPokemon) => {
        PokemonPictureFunction(randomPokemon);
      })
      .catch((error) => {
        console.log("Error: de pokemon functie werkt niet!");
      });
  }
};

/* Sixpicturesreturner(); */

app.set("port", 3000);
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    let RandomPokemon: string[] = [];
    for (let i = 0; i < 6; i++) {
      RandomPokemon[i] = await RandomPokemonGenerator();
    }
    let PokemonImg: string[] = [];
    for (let i = 0; i < 6; i++) {
      PokemonImg[i] = await PokemonPictureFunction(RandomPokemon[i]);
    }
    res.render("keuzepagina", {
      PokemonImg1: PokemonImg[0],
      PokemonImg2: PokemonImg[1],
      PokemonImg3: PokemonImg[2],
      PokemonImg4: PokemonImg[3],
      PokemonImg5: PokemonImg[4],
      PokemonImg6: PokemonImg[5],
    });
  } catch (error) {
    console.log("error");
  }
});

app.listen(app.get("port"), () => {
  console.log("[server]http://localhost:" + app.get("port"));
});

/* dit mag weg */
pokemonSetter();

//WEBSITE

/* spreekt voor zichzelf start op poort 3000 */

/* app.set("port", 3000);
app.set("view engine", "ejs"); */

//hier werd aysync gebruikt voor de waarde opte wachten want de functie is asynchronis.

/* app.get("/", async (req, res) => {
  const pokemonArray = await pokemonSetter();
  const pokemonlength = await pokemonelength();
  res.render("index", {
    pokemonarray: pokemonArray,
    pokemonlength: pokemonlength,
  });
});

app.listen(app.get("port"), () => {
  console.log("[server]http://localhost:" + app.get("port"));
});
 */
//Allepokemon functie deze werd gebruikt als referentie.

/* Allepokemon(); */

/* const Allepokemon = async () => {
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
};
 */

export {};
