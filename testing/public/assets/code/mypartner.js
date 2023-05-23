let NameOutputHidden = document.querySelectorAll("#NameOutputHidden");
let PokemonCaught = document.querySelectorAll("#PokemonCaught");
let Imgs = document.querySelectorAll("#PokemonImg");
/* Variable */

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
      
    let pokemonUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemonvariable}`).then(res => res.json());
    return pokemonUrl.sprites.other['official-artwork'].front_default;
    
    }
    catch(error)
    {
      console.log(error)
    }
    
  };

/* Zorgt ervoor dat de foto's met hun element worden geladen als foto met de juiste pokemon erbij */
const SrcPictureFunction = async() =>{
    try{
      const SpecialUrlArray =[]
      for(let i = 0; i < PokemonCaught.length; i++){
          SpecialUrlArray[i] = await PokemonPictureFunction(PokemonCaught[i].innerHTML);
      }

      for (let index = 0; index < PokemonCaught.length; index++) {
        Imgs[index].src = SpecialUrlArray[index];        
      }

    }catch(error){
      console.log(error)
    }
}

SrcPictureFunction();

