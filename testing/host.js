import express from "express";
import ejs from "ejs";

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

/*------Catcher------*/
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
app.get("/views/mypartner.ejs", (req, res) => {
  res.render("mypartner")
})

/*------PokeCatcher------*/
app.get("/views/pokecatcher.ejs", (req, res) => {
  res.render("pokecatcher")
})

/*------PokeDex------*/
app.get("/views/pokedex.ejs", (req, res) => {
  res.render("pokedex")
})

app.use(express.static("public"));
app.use("/images", express.static("images"));
