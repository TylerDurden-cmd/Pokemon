/* Element */
let container1 = document.getElementById("container-item-1")
let container2 = document.getElementById("container-item-2")
let container3 = document.getElementById("container-item-3")
let container4 = document.getElementById("container-item-4")
let container5 = document.getElementById("container-item-5")
let container6 = document.getElementById("container-item-6")

/* Variable */
let pokemonArray = [];

/* Het plekje voor alle functies */
/* Fetched de pokemon url voor de pokemon name  */
const PokemonFetcher = async () => {
    try{
    const pokemonurl = await fetch("https://pokeapi.co/api/v2/pokedex/1");
    const data = await pokemonurl.json();
    return data;
}catch(error){
    console.log(error)
}
  };
  
/* PokemonPicture functie pakt een parameter mee die een functie is hier in de naam van de random Pokemon
de functie geeft de sprite terug met de juiste pokemon parameter */
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
  
  /* RandomPokemon Namen worden in deze functie gegenereerd */
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

/* Zorgt ervoor dat de foto's met hun element worden geladen als foto met de juiste pokemon erbij */
const SrcPictureFunction = async() =>{
    try{

        let RandomPokemon = [];
    for (let i = 0; i < 6; i++) {
        /* for loop word gemaakt waar de array met het i de ellement de value krijgt van de functie met de randompokemon */
        RandomPokemon[i] = await RandomPokemonGenerator();
      }

    const SpecialUrlArray =[]
    for(let i = 0; i < 6; i++){
        SpecialUrlArray[i] = await PokemonPictureFunction(RandomPokemon[i])
    }

    /* Uitleg hierover kan je vinden bij het catcher.js bestand */
    let img1 = document.createElement("img")
    img1.setAttribute("src",SpecialUrlArray[0]);
    container1.appendChild(img1);

    let img2 = document.createElement("img")
    img2.setAttribute("src",SpecialUrlArray[1]);
    container2.appendChild(img2);

    let img3 = document.createElement("img")
    img3.setAttribute("src",SpecialUrlArray[2]);
    container3.appendChild(img3);

    let img4 = document.createElement("img")
    img4.setAttribute("src",SpecialUrlArray[3]);
    container4.appendChild(img4);

    let img5 = document.createElement("img")
    img5.setAttribute("src",SpecialUrlArray[4]);
    container5.appendChild(img5);

    let img6 = document.createElement("img")
    img6.setAttribute("src",SpecialUrlArray[5]);
    container6.appendChild(img6);
}catch(error){
    console.log(error)
}
}

//SrcPictureFunction();

