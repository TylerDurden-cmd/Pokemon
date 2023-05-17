/* Variabelen */

/* Buttons */
let Attack = document.getElementById("Attack")
/* /buttons */

let RandomPokemonPicture = document.getElementById("WildPokemonBattler")
let PokemonNameBattler = document.getElementById("PokemonName-Battler")
let EigenPokemonBack = document.getElementById("PokemonBattler")
let PokemonNameMyPartner = document.getElementById("PokemonNameMyPartnerBattler")
let btnNext = document.getElementById("btnNext-Battler")
let valueHealthWild = document.getElementById("healthWild")
let valueHealth = document.getElementById("health")
let AttackP = document.getElementById("AttackP")
let DefenceP = document.getElementById("DefenceP")
let AsideStats = document.getElementById("AsideStats")
let won = document.getElementById("won")
let lost = document.getElementById("lost")
let draw = document.getElementById("draw")


/* Globale Variable  */
let pokemonArray = [];
/* verander deze naam voor een andere my partner pokemon alles veranderd automatisch ook stats*/
let EigenPokemon = "charizard";
let WildPokemonName = '';
let defaultValueMaxHealth;

/* Functies */
/* FetchStandardFunctie  Haalt url pokedex op voor de namen van pokemon*/
const PokemonFetcher = async () => {
  try {
    const pokemonurl = await fetch("https://pokeapi.co/api/v2/pokedex/1");
    const data = await pokemonurl.json();
    return data;
  } catch (error) {
    console.log(error)
  }
};
/* FechStandard */

/* PokemonPic */
/* Functie die een parameter meeneemt in deze parameter zit de random pokemon naam 
functie geeft een PokemonFoto weer met de juist pokemon */
const PokemonPictureFunction = async (Pokemonvariable) => {
  try {
    const url = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${Pokemonvariable}`
    );
    const urlJson = await url.json();

    /* de functie werkt met console.log(urlJson.sprites.back_default); */
    return urlJson.sprites.front_default;
  } catch (error) { console.log(error) }

};
/* PokemonPic */

/* Haalt een RandomPokemonNaam op zodat deze functie kan 
gebruikt worden als parameter bij functie PokePic */
/* RandomPokemon */
const RandomPokemonGenerator = async () => {
  try {
    let data = await PokemonFetcher();
    for (let i = 0; i < data.pokemon_entries.length; i++) {
      pokemonArray[i] = data.pokemon_entries[i].pokemon_species.name;
    }
    const RandomPokemonindex = Math.floor(
      Math.random() * data.pokemon_entries.length
    );

    /* console.log(pokemonArray[RandomPokemonindex]); */
    return pokemonArray[RandomPokemonindex];
  } catch (error) {
    console.log(error)
  }
};
/* RandomPokemon */

const name = async () => {
  let RandomGen = await RandomPokemonGenerator()
  return RandomGen;
}

/* PokemonSprite */
/* Functie voor het uitprinten van de foto's */
const PokemonSprite = async () => {
  try {
    let RandomGen = await RandomPokemonGenerator()
    let RandomPicturePokemon = await PokemonPictureFunction(RandomGen)
    let pic = document.createElement("img")
    pic.setAttribute("src", RandomPicturePokemon);
    RandomPokemonPicture.innerHTML = "";
    RandomPokemonPicture.appendChild(pic).style.width = "15rem"
    PokemonNameBattler.innerHTML = RandomGen;
    WildPokemonName = RandomGen;
    console.log(RandomGen)
    return RandomGen.name;
  } catch (error) {
    console.error(error)
  }
};

const EigenPokemonSprite = async (PokemonVar) => {
  let PokemonSprite = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonVar}`)
  let url = await PokemonSprite.json()
  let PokemonPicBack = url.sprites.back_default;
  /* Maak Een sprite van je eigen pokemon zijn back */
  return PokemonPicBack
}

/* deze functie geeft de my partner sprite hier is geen fanart van daarom gebruiken we de pixel versie */

const PokemonBackimg = async () => {
  let PokemonSprite = await EigenPokemonSprite(EigenPokemon);
  let pic = document.createElement("img");
  pic.setAttribute("src", PokemonSprite);
  EigenPokemonBack.innerHTML = "";
  EigenPokemonBack.appendChild(pic).style.width = "15rem"
  PokemonNameMyPartner.innerHTML = `${EigenPokemon}`
};

/* WildPokemonHealth spreekt voor zich zelf Wild is de RandomPokemon Waar we tegen vechten */
const WildPokemonHealth = async () => {
  try {
    let url = await fetch(`https://pokeapi.co/api/v2/pokemon/${WildPokemonName}`)
    console.log(url)
    let urljson = await url.json();
    let healthWild = await urljson.stats[0].base_stat;
    console.log(healthWild)
    defaultValueMaxHealth = healthWild;
    return healthWild;

  } catch (error) {
    console.error(error)
  }

}

/* Onze health stat van de mypartner pokemon */
const PokemonHealth = async () => {
  try {
    let url = await fetch(`https://pokeapi.co/api/v2/pokemon/${EigenPokemon}`)
    console.log(url)
    let urljson = await url.json();
    let healthWild = await urljson.stats[0].base_stat;
    console.log(healthWild)
    return healthWild;

  } catch (error) {
    console.error(error)
  }

}

/* the defence stat van de mypartner */
const PokemonDefence = async () => {
  let url = await fetch(`https://pokeapi.co/api/v2/pokemon/${EigenPokemon}`)
  let urlJson = await url.json();
  let Defence = await urlJson.stats[2].base_stat;
  return Defence;
}

/* de pokemonDefenceWild Stat van de random pokemon */
const PokemonDefenceWild = async () => {
  let url = await fetch(`https://pokeapi.co/api/v2/pokemon/${WildPokemonName}`)
  let urlJson = await url.json();
  let Defence = await urlJson.stats[2].base_stat;
  return Defence;
}

/* dit is onze next pokemon button hier word alles dan ook terug gereset */

btnNext.addEventListener("click", () => {
  PokemonSprite();
  valueHealthWild.value = 300;
  console.log(valueHealthWild.value)
  valueHealth.value = 300;
  AsideStats.style.visibility = "hidden"
  Attack.disabled = false
  won.innerHTML = ``;
  lost.innerHTML = ``;
  draw.innerHTML = ``;

})

/* en de attack knop voor de pokemon aan te vallen */
Attack.addEventListener("click", async () => {
  let url = await fetch(`https://pokeapi.co/api/v2/pokemon/${EigenPokemon}`)
  let urljson = await url.json();
  let AttackDamage = await urljson.stats[1].base_stat;
  let health = await WildPokemonHealth();
  console.log(AttackDamage)
  console.log(health)
  valueHealthWild.max = await health;
  let HealthSUBS = valueHealthWild.value -= await AttackDamage;
  let PokemonWildDf = await PokemonDefence() / 2;
  valueHealthWild.value = HealthSUBS += PokemonWildDf;
  console.log(PokemonWildDf)
  console.log(valueHealthWild.value)
  /* steeks in een aparte functie omdat ik dit makkelijker vond voor bv de functie soms niet te callen 
  dit kan ook zonder de functie door de code in de attack knop rechtstreeks te steken maar laat het zo */
  const ComeBack = async () => {
    let Df = await PokemonDefenceWild() / 2;
    let urlWild = await fetch(`https://pokeapi.co/api/v2/pokemon/${WildPokemonName}`)
    let urljsonWild = await urlWild.json();
    let AttackDamageWild = await urljsonWild.stats[1].base_stat;
    let EigenPokemonHealth = await PokemonHealth();
    valueHealth.max = await EigenPokemonHealth
    let eigenHealthSubs = valueHealth.value -= await AttackDamageWild;
    valueHealth.value = eigenHealthSubs += Df;
    console.log(AttackDamageWild)
    console.log(Df)
    console.log(valueHealth.value)

    /* de filter voor wat professor oak moet zeggen aan de hand van de resultaat van de battle */
    if (valueHealth.value <= 0 && valueHealthWild.value <= 0) {
      AsideStats.style.visibility = "visible"
      Attack.disabled = true
      draw.innerHTML = `And its a draw!`
    }
    else if (valueHealth.value <= 0) {
      AsideStats.style.visibility = "visible"
      Attack.disabled = true
      lost.innerHTML = `It seems like ${EigenPokemon} is not strong enough to take on ${WildPokemonName}`

    }
    else if (valueHealthWild.value <= 0) {
      AsideStats.style.visibility = "visible"
      Attack.disabled = true
      won.innerHTML = `Well done! you have won the battle against ${WildPokemonName}`

    }
  }


  ComeBack();
})



PokemonBackimg();
const PokemonCall = async () => {
  await PokemonSprite();
  await WildPokemonHealth();
}
PokemonCall();