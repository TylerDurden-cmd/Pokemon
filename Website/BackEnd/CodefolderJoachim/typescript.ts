//FOLDER NIET VERWIJDEREN.
//hehe sorry voor zo veel folders te maken ik vond het makkelijker om met een lege folder te werke tehee (*/ω＼*).
import express from "express";
const app = express();

//FUNCTIES

/* functie voor het vragen van de url zodat je de functie maar hoeft op te roepen en 
direct aan de slag kan gaan met het toevoegen van volgende data.*/
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

/* pokemonsetter is een functie voor het uitprinten van pokemonnamen je mag de naam 
origineler maken geen console.log omdat er niets word afgeprint in de terminal alleen return 
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
/* functie voor het uittesten van de sprite die word meegegeven de pokemon word gekozen doormiddel van de parameter
in de functie de url word gepakt en de parameter die een pokemon naam zal bevatten word hier samen mee gefetcht 
deze word dan terug gereturned met de functie en de voledige url van deze pokemon zijn sprite. */
const PokemonPictureFunction = async (Pokemonvariable: string) => {
  const url = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${Pokemonvariable}`
  );
  const urlJson = await url.json();
  /* de functie werkt met console.log(urlJson.sprites.back_default); */
  return urlJson.sprites.front_default;
};
/* 
  PokemonPictureFunction("pikachu");
  */

/* functie voor random pokemon te kiezen. werkt door de pokemonnamen in een array 
te steken en deze dan door de lengte van de pokemon array zelf met math random te berekenen hier word dan een variable 
gemaakt met een random getal die dan word gevraagd en returnd bij de array. */

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

/* Functie voor het returnen van zes fotos Deze moet behandeld worden met .then omdat bijde functies async zijn.
deze moet dan opgevangen worden in een catch als het missgaat */
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
  /* try word hier toegepast  */
  try {
    /* RandomPokemonstring word aangemaakt als array. */
    let RandomPokemon: string[] = [];
    for (let i = 0; i < 6; i++) {
      /* for loop word gemaakt waar de array met het i de ellement de value krijgt van de functie met de randompokemon */
      RandomPokemon[i] = await RandomPokemonGenerator();
    }
    /* PokemonImg word aangemaakt als array voor de 2 functies  */
    let PokemonImg: string[] = [];
    for (let i = 0; i < 6; i++) {
      /* for loop word gemaakt tot 6 de functie pokemonPicture met zijn parameter randompokemon en het i de element word gemaakt
      deze word in de parameter gestoken pokemonImg met zijn ide element zodat die kan toegepast worden in ejs. */
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
