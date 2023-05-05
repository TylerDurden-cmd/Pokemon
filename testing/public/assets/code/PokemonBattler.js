let btn = document.getElementById("btn");
let RandomPokemonPicture = document.getElementById("PokemonRandomPicture")

let pokemonArray = [];

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
    return urlJson.sprites.other['official-artwork'].front_default;
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



  const GroteFunctieZonderGoeieNaam = async() => {
    let RandomGen = await RandomPokemonGenerator()
    let RandomPicturePokemon = await PokemonPictureFunction(RandomGen)
    let pic = document.createElement("img")
    pic.setAttribute("src",RandomPicturePokemon);
    RandomPokemonPicture.innerHTML = "";
    RandomPokemonPicture.appendChild(pic)

  }

  /* Maak Een sprite van je eigen pokemon zijn back */


  GroteFunctieZonderGoeieNaam();

btn.addEventListener("click" , ()=> {

})