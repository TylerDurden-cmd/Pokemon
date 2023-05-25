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
const WildPokemonSprite = async () => {
  try {
    let RandomGen = await RandomPokemonGenerator()
    let RandomPicturePokemon = await PokemonPictureFunction(RandomGen)
    let pic = document.createElement("img")
    pic.setAttribute("src", RandomPicturePokemon);
    RandomPokemonPicture.innerHTML = "";
    RandomPokemonPicture.appendChild(pic).style.height = "15rem"
    PokemonNameBattler.innerHTML = RandomGen;
    WildPokemonName = RandomGen;
    console.log(RandomGen.name)
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
  let PokemonSprite = await EigenPokemonSprite(PokemonNameMyPartner.innerHTML);
  let pic = document.createElement("img");
  pic.setAttribute("src", PokemonSprite);
  EigenPokemonBack.innerHTML = "";
  EigenPokemonBack.appendChild(pic).style.width = "15rem"
};

/* WildPokemonHealth spreekt voor zich zelf Wild is de RandomPokemon Waar we tegen vechten */
const WildPokemonHealth = async () => {
  try {
    let url = await fetch(`https://pokeapi.co/api/v2/pokemon/${WildPokemonName}`)
    console.log(url)
    let urljson = await url.json();
    let healthWild = await urljson.stats[0].base_stat;
    console.log(`wild base hp: ${healthWild}`)
    defaultValueMaxHealth = healthWild;
    return healthWild;

  } catch (error) {
    console.error(error)
  }

}

/* Onze health stat van de mypartner pokemon */
const PokemonHealth = async () => {
  try {
    let url = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonNameMyPartner.innerHTML}`)
    console.log(url)
    let urljson = await url.json();
    let health = await urljson.stats[0].base_stat;
    console.log(`partner base hp: ${health}`)
    return health;

  } catch (error) {
    console.error(error)
  }

}

/* the defence stat van de mypartner */
const PokemonDefence = async (PokemonName, isSpecial) => {
  let url = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonName}`)
  let urlJson = await url.json();
  let Defense = await urlJson.stats[2].base_stat;
  let spDefense = await urlJson.stats[4].base_stat;
  if (isSpecial) {
    return spDefense
  }
  else{
    return Defense
  }
}

/* steeks in een aparte functie omdat ik dit makkelijker vond voor bv de functie soms niet te callen 
  dit kan ook zonder de functie door de code in de attack knop rechtstreeks te steken maar laat het zo */
const ComeBack = async () => {
  let urlWild = await fetch(`https://pokeapi.co/api/v2/pokemon/${WildPokemonName}`)
  let urljsonWild = await urlWild.json();
  let Df
  let AttackDamageWild;
  let attack = await urljsonWild.stats[1].base_stat;
  let spAttack = await urljsonWild.stats[3].base_stat;
  if (attack > spAttack) {
    AttackDamageWild = attack;
    Df = await PokemonDefence(PokemonNameMyPartner.innerHTML, false);
  }
  else{
    AttackDamageWild = spAttack;
    Df = await PokemonDefence(PokemonNameMyPartner.innerHTML, true);
  }

  let EigenPokemonHealth = await PokemonHealth();
  valueHealth.max = await EigenPokemonHealth
  let eigenHealthSubs = valueHealth.value -= await AttackDamageWild;
  valueHealth.value = eigenHealthSubs += Df;
  console.log(`wild atk: ${AttackDamageWild}`)
  console.log(`partner def: ${Df}`)
  console.log(`partner current hp: ${valueHealth.value}`)

  /* de filter voor wat professor oak moet zeggen aan de hand van de resultaat van de battle */
  if (valueHealth.value <= 0 && valueHealthWild.value <= 0) {
    AsideStats.style.visibility = "visible"
    Attack.disabled = true
    draw.innerHTML = `And its a draw!`
  }
  else if (valueHealth.value <= 0) {
    AsideStats.style.visibility = "visible"
    Attack.disabled = true
    lost.innerHTML = `It seems like ${PokemonNameMyPartner.innerHTML} is not strong enough to take on ${WildPokemonName}`

  }
  else if (valueHealthWild.value <= 0) {
    AsideStats.style.visibility = "visible"
    Attack.disabled = true
    won.innerHTML = `Well done! you have won the battle against ${WildPokemonName}`

  }
}

/* dit is onze next pokemon button hier word alles dan ook terug gereset */
btnNext.addEventListener("click", () => {
  WildPokemonSprite();
  valueHealthWild.value = 300;
  console.log(`wild total hp: ${valueHealthWild.value}`)
  valueHealth.value = 300;
  AsideStats.style.visibility = "hidden"
  Attack.disabled = false
  won.innerHTML = ``;
  lost.innerHTML = ``;
  draw.innerHTML = ``;

})

/* en de attack knop voor de pokemon aan te vallen */
Attack.addEventListener("click", async () => {
  let url = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonNameMyPartner.innerHTML}`)
  let urljson = await url.json();
  let AttackDamage;
  let PokemonWildDf;
  let attack = await urljson.stats[1].base_stat;
  let spAttack = await urljson.stats[3].base_stat;
  if (attack > spAttack) {
    AttackDamage = attack;
    PokemonWildDf = await PokemonDefence(WildPokemonName,false);
  }
  else{
    AttackDamage = spAttack;
    PokemonWildDf = await PokemonDefence(WildPokemonName,true);
  }

  let health = await WildPokemonHealth();
  console.log(`partner atk: ${AttackDamage}`)
  console.log(`wild total hp: ${health}`)
  valueHealthWild.max = await health;
  let HealthSUBS = valueHealthWild.value -= await AttackDamage;
  valueHealthWild.value = HealthSUBS += PokemonWildDf;
  console.log(`wild def: ${PokemonWildDf}`)
  console.log(`current wild hp: ${valueHealthWild.value}`)

  ComeBack();
})



PokemonBackimg();
const PokemonCall = async () => {
  await WildPokemonSprite();
  await WildPokemonHealth();
}
PokemonCall();