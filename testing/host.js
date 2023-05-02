import express from "express";
import ejs from "ejs";
import fetch from "node-fetch";

/* Het plekje voor alle functies */
const PokemonFetcher = async () => {
  const pokemonurl = await fetch("https://pokeapi.co/api/v2/pokedex/1");
  const data = await pokemonurl.json();
  return data;
};

const pokemonSetter = async () => {
  const PokemonNameArray = [];
  let data = await PokemonFetcher();
  for (let i = 0; i < data.pokemon_entries.length; i++) {
    PokemonNameArray[i] = data.pokemon_entries[i].pokemon_species.name;
  }

  return PokemonNameArray;
};

const pokemonelength = async () => {
  const pokemonawait = await PokemonFetcher();
  return pokemonawait.pokemon_entries.length;
};

//prints data from the pokemon url.
const PokemonAssetsFetcher = async () => {
  const pokemonAssetUrl = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await pokemonAssetUrl.json();
  return data;
};

//pokemonPictureforanypokemon
/* functie voor het uittesten van de sprite die word meegegeven de pokemon word gekozen doormiddel van de parameter
in de functie de url word gepakt en de parameter die een pokemon naam zal bevatten word hier samen mee gefetcht 
deze word dan terug gereturned met de functie en de voledige url van deze pokemon zijn sprite. */
const PokemonPictureFunction = async (Pokemonvariable) => {
  const url = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${Pokemonvariable}`
  );
  const urlJson = await url.json();
  /* de functie werkt met console.log(urlJson.sprites.back_default); */
  return urlJson.sprites.front_default;
};


const RandomPokemonGenerator = async () => {
  let data = await PokemonFetcher();
  const pokemonArray = [];
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


//webhosting



const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");

/*------Landingpage------*/
app.get("/", (req, res) => {
  res.render("landingpage");
});

app.get("/landingpage", (req, res) => {
  res.render("landingpage")
})

/*------Compare------*/
app.get("/views/compare.ejs", async (req, res) => {
  const pokemonArray = await pokemonSetter();
  const pokemonlength = await pokemonelength();
  res.render("compare", {
    pokemonarray: pokemonArray,
    pokemonlength: pokemonlength,
  });
})

/*------Login------*/
app.get("/views/login.ejs", (req, res) => {
  res.render("login");
})

/*------Contact------*/
app.get("/views/contact.ejs", (req, res) => {
  res.render("contact")
})

/*------MyPartner------*/

app.get("/views/mypartner.ejs", async(req, res) => {
    res.render("mypartner");
})


/*------PokeCatcher------*/
app.get("/views/pokecatcher.ejs", async (req, res) => {
  const PokemonRandom = await RandomPokemonGenerator();
  const PokemonGeneratorImg = await PokemonPictureFunction(PokemonRandom);
  res.render("pokecatcher",{PokemonRandom:PokemonRandom,
  PokemonGeneratorImg:PokemonGeneratorImg})
})

/*------PokeDex------*/
app.get("/views/pokedex.ejs", (req, res) => {
  res.render("pokedex")
})

/*------Raadpokemon------*/

app.get("/views/raadpokemon.ejs", (req, res) => {
  res.render("raadpokemon")
})

app.listen(app.get("port"), () =>
  console.log("[Pichu Partners] http://localhost:" + app.get("port"))
);

app.use(express.static("public"));
app.use("/images", express.static("images"));