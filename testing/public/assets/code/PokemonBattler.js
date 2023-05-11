let btn = document.getElementById("btn");
let BtnAttack = document.getElementById("btnAttack")
let RandomPokemonPicture = document.getElementById("PokemonRandomPicture")
let EigenPokemonBack = document.getElementById("EigenPokemonBack")
let PokemonNameBattler = document.getElementById('PokemonNameBattler');


let pokemonArray = [];
let EigenPokemon = "pichu";
 /* Moet vervangen worden met eigen pokemon uit databank */
 let EigenPokemonAttack = 45;
 let EigenPokemonDefence = 50;

/* --Functies-- */

/* functie voor het uittesten van de sprite die word meegegeven de pokemon word gekozen doormiddel van de parameter
in de functie de url word gepakt en de parameter die een pokemon naam zal bevatten word hier samen mee gefetcht 
deze word dan terug gereturned met de functie en de voledige url van deze pokemon zijn sprite. */

/* Het plekje voor alle Belangrijke functies */
/* Haalt url pokedex op voor de namen van pokemon */
const PokemonFetcher = async () => {
    try{
    const pokemonurl = await fetch("https://pokeapi.co/api/v2/pokedex/1");
    const data = await pokemonurl.json();
    return data;
}catch(error){
    console.log(error)
}
  };
  
/* Functie die een parameter meeneemt in deze parameter zit de random pokemon naam 
functie geeft een PokemonFoto weer met de juist pokemon */
const PokemonPictureFunction = async (Pokemonvariable) => {
    try{
    const url = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${Pokemonvariable}`
    );
    const urlJson = await url.json();

    /* de functie werkt met console.log(urlJson.sprites.back_default); */
    return urlJson.sprites.front_default;
    }catch(error){console.log(error)}
    
  };

  /* Haalt een RandomPokemonNaam op zodat deze functie kan 
  gebruikt worden als parameter bij functie PokePic */
  const RandomPokemonGenerator = async () => {
    try{
    let data = await PokemonFetcher();
    for (let i = 0; i < data.pokemon_entries.length; i++) {
      pokemonArray[i] = data.pokemon_entries[i].pokemon_species.name;
    }
    const RandomPokemonindex = Math.floor(
      Math.random() * data.pokemon_entries.length
    );

    /* console.log(pokemonArray[RandomPokemonindex]); */
    return pokemonArray[RandomPokemonindex];
}catch(error){
    console.log(error)
}
  };

  const PokemonSprite = async() => {
    let RandomGen = await RandomPokemonGenerator()
    let RandomPicturePokemon = await PokemonPictureFunction(RandomGen)
    let pic = document.createElement("img")
    pic.setAttribute("src",RandomPicturePokemon);
    RandomPokemonPicture.innerHTML = "";
    RandomPokemonPicture.appendChild(pic)
    PokemonNameBattler.innerHTML = RandomGen;
    
    console.log(RandomGen)

    return RandomGen;

  }

  const EigenPokemonSprite = async(PokemonVar) =>{
    let PokemonSprite = await fetch(`https://pokeapi.co/api/v2/pokemon/${PokemonVar}`)
    let url = await PokemonSprite.json()
    let PokemonPicBack = url.sprites.back_default;
  /* Maak Een sprite van je eigen pokemon zijn back */
  return PokemonPicBack
}

const PokemonBackimg = async() =>{
  let PokemonSprite = await EigenPokemonSprite(EigenPokemon);
  let pic = document.createElement("img");
  pic.setAttribute("src",PokemonSprite);
  EigenPokemonBack.innerHTML = "";
  EigenPokemonBack.appendChild(pic)
}

const PokemonStatsFetcherDef = async() => {
  try{  
  const Pokemon = PokemonNameBattler.textContent
  console.log(Pokemon)
  let Pokemonurl = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon}`)
  let url = await Pokemonurl.json()
  let PokemonDefence = await url.stats[2].base_stat; 
  return PokemonDefence;
}catch(error){
  console.log(error)
}
}

const PokemonStatsFetcherAtt = async() =>{
  try{
  const Pokemon = PokemonNameBattler.textContent
  let Pokemonurl = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon}`)
  let url = await Pokemonurl.json()
  let PokemonAttack = await url.stats[1].base_stat;
  return PokemonAttack; 
}catch(error){
  console.log(error)
}
}

const Attack = async() =>{
  let Defence = await PokemonStatsFetcherDef();
  let Attack = await PokemonStatsFetcherAtt();
  let AttackSum = Defence - EigenPokemonAttack;
  console.log(Attack)
  console.log(Defence)
  console.log(EigenPokemonAttack)
  console.log(AttackSum)
}

btn.addEventListener("click" , ()=> {
  PokemonSprite();
})

BtnAttack.addEventListener("click", ()=> {
  Attack();
})


PokemonSprite();
PokemonBackimg();
Attack();
