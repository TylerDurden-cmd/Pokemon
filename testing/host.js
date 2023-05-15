import express from "express";
import ejs from "ejs";
import fetch from "node-fetch";
import {MongoClient} from "mongodb"
import crypto from "crypto";


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

const PokemonLength = async () => {
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

//Pichu Partners Database
const uri = "mongodb+srv://s145053:nkeI6RQVBJYBgg41@pichupartners.ah3odo1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const exit = async () => {
  try {
    await client.close();
    console.log("Succesfully disconnected from Pichu Partners Database!");
    process.exit(0);
  } catch (error) {
    console.error(error)
  }

}

const connect = async () => {
  try {
    await client.connect();
    console.log("Succesfully connected to Pichu Partners Database!");
    process.on("SIGINT", exit);
  } catch (error) {
    console.error(error)
  }
}

connect();

//webhosting


const app = express();

app.set("port", 3000);
app.set("view engine", "ejs");

app.use(express.json({limit: `1mb`}));
app.use(express.urlencoded({extended: true}))

/*------Landingpage------*/
app.get("/", (req, res) => {
  res.render("landingpage");
});

app.get("/landingpage", (req, res) => {
  res.render("landingpage")
});

/*------Compare------*/
app.get("/compare", async (req, res) => {
  const pokemonArray = await pokemonSetter();
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
app.post("/login", async (req, res) =>{
  const username = req.body.username;
  const password = req.body.psw;

  //haalt salt en password vanuit de DB op
  const user = await client.db("Pichu").collection('Users').findOne({username: username}); 
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
     res.redirect('compare');
    }
    else{
         return res.sendStatus(500);
    }
  });
});

/*------Registreer------*/
app.get("/register", (req,res) => {
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

    client.db("Pichu").collection('Users').insertOne({ firstname, lastname, username, mail, password: hashedPassword, salt }, (err, res) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      console.log(`User ${username} registered with hashed password ${hashedPassword} and salt ${salt}`);
      res.sendStatus(200);
    });
  });
  res.redirect("landingpage")
});



/*------Contact------*/
app.get("/contact", (req, res) => {
  res.render("contact")
});

/*------MyPartner------*/

app.get("/mypartner", (req, res) => {
    res.render("mypartner");
});

/* ------Battler------- */
app.get("/battler" ,(req,res) => {
  res.render("battler")
});

/*------PokeCatcher------*/
app.get("/pokecatcher", async (req, res) => {
  /* verwijderd laat dit leeg bij conflict oplossen aub. */
  /* mvg joachim */
  res.render("pokecatcher")
});

/*------PokeDex------*/
app.get("/pokedex", (req, res) => {
  res.render("pokedex")
});

/*------Raadpokemon------*/

app.get("/raadpokemon", (req, res) => {
  res.render("raadpokemon")
});

app.listen(app.get("port"), () =>
  console.log("[Pichu Partners] http://localhost:" + app.get("port"))
);

app.use(express.static("public"));
app.use("/images", express.static("images"));