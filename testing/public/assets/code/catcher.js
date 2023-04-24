//Takes data from the ejs.
let btn = document.querySelector(".buttoncatch")
let pokebal = document.querySelector(".pokebal")
let Pokemon = document.querySelector(".RandomPokemon")
let counter = document.querySelector(".countcontainer")
let PokemonCaught = document.querySelector(".PokemonCaughtContainer")
let containerPokemon = document.querySelector(".containerPokemonCatcher")
let buttonRefreshPage = document.querySelector(".buttonRefreshPage")
let KeepThisPokemon = document.querySelector(".ContainerKeepThisPokemon")
let btnYes = document.querySelector(".yesButtonCatcher")
let btnNo = document.querySelector(".noButtonCatcher")
//All Functions 
const ColorGreen = () =>{
    pokebal.style.backgroundColor = "Green"
}

const ColorRed = () =>{
    pokebal.style.backgroundColor = "Red"
}

const ColorborderGreen = () =>{
  containerPokemon.style.borderColor = "Green"
}

const ColorborderRed = () =>{
  containerPokemon.style.borderColor = "Red"
}

const RefreshPage = () => {
  window.location.reload();
}

const KeepPokemon = () => {
  KeepThisPokemon.style.visibility =  "visible"
}

counter.textContent = 3;

btn.addEventListener('click',async(e)=>{
    counter.textContent--;

    try{
  const take = await(await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.textContent}`)).json()
  let EigenPokemnoAttack = 30;
  const PokemonDefenceStats = take.stats[3].base_stat
  const PercentageVoorPokemonCatcher = 100 - EigenPokemnoAttack + PokemonDefenceStats;
  const PercentageVoorPokemonCatcherBerekend = Math.floor(Math.random() * PercentageVoorPokemonCatcher)
  if(EigenPokemnoAttack > PercentageVoorPokemonCatcherBerekend){
    btn.disabled = true;
    ColorGreen();
    ColorborderGreen();
    PokemonCaught.innerHTML = `Congrats You Caught ${Pokemon.textContent}!!`
    KeepPokemon();

    btnYes.addEventListener("click", (e) =>{
      PokemonCaught.innerHTML = `${Pokemon.textContent} is in your inventory`
    });

    btnNo.addEventListener("click",RefreshPage)
  }else{
    ColorRed();
    ColorborderRed();
  }}catch(error){
    console.log('error')
  }

  if(counter.textContent == 0){
  btn.addEventListener("click",RefreshPage)
  }
});