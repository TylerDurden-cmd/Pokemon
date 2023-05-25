import express from "express";
import ejs from "ejs";
import fetch from "node-fetch";
import crypto from "crypto";
import { connect, AddUser, FindUserbyUsername, AddPokemonToUser, getAllPokemonFromUser, setPartner, getPartner, removePokemon } from "./db.js";

let loggedInUser = " ";

//Het plekje voor alle functies
const PokemonFetcher = async () => {
  const pokemonurl = await fetch("https://pokeapi.co/api/v2/pokedex/1");
  const data = await pokemonurl.json();
  return data;
};
const PokemonNameGetter = async () => {
  const PokemonNameArray = [];
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


//webhosting
const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");

app.use(express.json({ limit: `1mb` }));
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));
app.use("/images", express.static("images"));

/*------Landingpage------*/
app.get("/", (req, res) => {
  res.render("landingpage");
});
app.get("/landingpage", (req, res) => {
  res.render("landingpage")
});

/*------Index------*/
app.get("/index", (req, res) => {
  res.render("index");
});

/*------Compare------*/
app.get("/compare", async (req, res) => {
  const pokemonArray = await PokemonNameGetter();
  const pokemonlength = await PokemonLength();
  res.render("compare", {
    pokemonarray: pokemonArray,
    pokemonlength: pokemonlength
  });
});

/*------Login------*/
app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.psw;

  //haalt salt en password vanuit de DB op
  const user = await FindUserbyUsername(username);
  const salt = user.salt;
  const hashFromDB = user.password;

  //hashed het ingevoerde wachtwoord met de salt vn de user
  crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    //hash van het wachtwoord van de login-form
    const hashFromLogin = derivedKey.toString('hex');
    //als beide hashes gelijk zijn dan is het wachtwoord correct
    if (hashFromDB == hashFromLogin) {
      loggedInUser = username;
      res.redirect('/index');
    }
    else {
      return res.redirect('/login')
      /* return res.sendStatus(500); */
    }
  });
});

/*------Registreer------*/
app.get("/register", (req, res) => {
  res.render("register")
});
app.post('/register', (req, res) => {
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const username = req.body.name;
  const mail = req.body.mail;
  const password = req.body.psw;

  const salt = crypto.randomBytes(16).toString('hex');
  crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    const hashedPassword = derivedKey.toString('hex');

    AddUser(firstname, lastname, username, mail, hashedPassword, salt);
    console.log(`User ${username} registered with hashed password ${hashedPassword} and salt ${salt}`);
  });
  res.redirect("landingpage")
});

/*------Contact------*/
app.get("/contact", (req, res) => {
  res.render("contact")
});

/*------MyPartner------*/
app.get("/mypartner", async (req, res) => {
  let pokemon = await getAllPokemonFromUser(loggedInUser);
  let partner = await getPartner(loggedInUser);
  res.render("mypartner", { pokemon: pokemon, partner: partner });
});
app.post('/partner', async (req, res) => {
  let pkmnName = req.body.NameOutputHidden;
  setPartner(loggedInUser, pkmnName);
  let pokemon = await getAllPokemonFromUser(loggedInUser);
  let partner = await getPartner(loggedInUser);
  res.redirect('mypartner');
});
app.post('/release', async (req, res) => {
  let pkmnName = req.body.NameOutputHidden;
  removePokemon(loggedInUser, pkmnName);

  res.redirect('mypartner');
});

/* ------Battler------- */
app.get("/battler", async (req, res) => {
  let haspartner = await getPartner(loggedInUser);
  if (haspartner == "") {
    let partner = "pichu";
    res.render("battler", { pokepartner: partner });
  }
  else {
    let partner = await getPartner(loggedInUser);
    res.render("battler", { pokepartner: partner });
  }
});

/*------PokeCatcher------*/
app.get("/pokecatcher", async (req, res) => {
  let haspartner = await getPartner(loggedInUser);
  if (haspartner == "") {
    let partner = "pichu";
    res.render("pokecatcher", { pokepartner: partner });
  }
  else {
    let partner = await getPartner(loggedInUser);
    res.render("pokecatcher", { pokepartner: partner });
  }

});
app.post('/catcher', async (req, res) => {
  let pkmnName = req.body.NameOutputHidden;
  AddPokemonToUser(loggedInUser, pkmnName);
  let haspartner = await getPartner(loggedInUser);
  if (haspartner == null) {
    let partner = "pichu";
    res.redirect("pokecatcher");
  }
  else {
    let partner = await getPartner(loggedInUser);
    res.redirect("pokecatcher");
  }
});

/*------PokeDex------*/
app.get("/pokedex", (req, res) => {
  res.render("pokedex")
});

/*------Raadpokemon------*/
app.get("/raadpokemon", (req, res) => {
  res.render("raadpokemon")
});

app.listen(app.get("port"), async () => {
  try {
    await connect();
  }
  catch (e) {
    console.log("MongoDB connection failed. Check your connection string.");
  }
  console.log("[Pichu Partners] http://localhost:" + app.get("port"))
});