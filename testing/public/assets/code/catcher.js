let btn = document.querySelector(".buttoncatch")
let pokebal = document.querySelector(".pokebal")
let Pokemon = document.querySelector(".RandomPokemon")
let counter = document.querySelector(".countcontainer")
let PokemonCaught = document.querySelector(".PokemonCaughtContainer")

const ColorGreen = () =>{
    pokebal.style.backgroundColor = "Green"
}


const ColorRed = () =>{
    pokebal.style.backgroundColor = "Red"
}


counter.textContent = 3;

btn.addEventListener('click',async(e)=>{
    counter.textContent--;

    try{
  const take = await(await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.textContent}`)).json()
  let EigenPokemnoAttack = 48;
  const PokemonDefenceStats = take.stats[3].base_stat
  const PercentageVoorPokemonCatcher = 100 - EigenPokemnoAttack + PokemonDefenceStats;
  const PercentageVoorPokemonCatcherBerekend = Math.floor(Math.random() * PercentageVoorPokemonCatcher)
  if(EigenPokemnoAttack > PercentageVoorPokemonCatcherBerekend){

    ColorGreen();
    PokemonCaught.innerHTML = `Congrats You Caught ${Pokemon.textContent}!!`
  }else{
    ColorRed();
  }}catch(error){
    console.log('error')
  }
});