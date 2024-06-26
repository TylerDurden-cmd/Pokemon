//Takes data from the ejs.
let Img = document.getElementById("PokemonGeneratorImg")
let Pokemon = document.getElementById("name")
let btn = document.querySelector(".buttoncatch")
let pokebal = document.querySelector(".pokebal")
let counter = document.querySelector(".countcontainer")
let PokemonCaughtContainer = document.getElementById("ContainerKeepThisPokemon")
let CaughtText = document.getElementById("CaughtText")
let btnNext = document.getElementById("BtnNext")
let btnyes = document.getElementById("Yesbtn")
let btnno = document.getElementById("Nobtn")
let Procent = document.getElementById("procent")
let RandomGetalVan0tot100 = document.getElementById("RandomGetalVan0tot100")
let EigenPokemonSpAttackStat = document.getElementById("EigenPokemonSpAttackStat")
let EigenPokemonAttackStat = document.getElementById("EigenPokemonAttackStat")
let PokemonDefenseStat = document.getElementById("PokemonDefenseStat")
let PokemonSpDefenseStat = document.getElementById("PokemonSpDefenseStat")
let NameOutputHidden = document.getElementById("NameOutputHidden");
let partnerName = document.getElementById("partnerName");
let partnerImg = document.getElementById("partnerImg");
/* ---Variable + Values Toepassen--- */

counter.textContent = 3;
let pokemonArray = [];

/* -------Alle functies------- */

/* Functie Kleur button groen */
const ColorGreen = () => {
  console.log("color Green")
  pokebal.style.backgroundColor = "Green"
}

/* Functie Kleur button rood */
const ColorRed = () => {
  console.log("color red")
  pokebal.style.backgroundColor = "Red"
}

/* Functie Kleur border groen word nu niet gebruikt maar kan toegepast worden*/
const ColorborderGreen = () => {
  containerPokemon.style.borderColor = "Green"
}

/* Functie Kleur border groen word nu niet gebruikt maar kan toegepast worden*/
const ColorborderRed = () => {
  containerPokemon.style.borderColor = "Red"
}

/* Functie voor het refreshen van pagina Bronnen StackOverflow word niet gebruikt
Er is al een alternatief gevonden */
const RefreshPage = () => {
  window.location.reload();
}

//pokemonPictureforanypokemon
/* functie voor het uittesten van de sprite die word meegegeven de pokemon word gekozen doormiddel van de parameter
in de functie de url word gepakt en de parameter die een pokemon naam zal bevatten word hier samen mee gefetcht 
deze word dan terug gereturned met de functie en de voledige url van deze pokemon zijn sprite. */

/* Het plekje voor alle Belangrijke functies */
/* Haalt url pokedex op voor de namen van pokemon */
const PokemonFetcher = async () => {
  try {
    const pokemonurl = await fetch("https://pokeapi.co/api/v2/pokedex/1");
    const data = await pokemonurl.json();
    return data;
  } catch (error) {
    console.log(error)
  }
};

/* Functie die een parameter meeneemt in deze parameter zit de random pokemon naam 
functie geeft een PokemonFoto weer met de juist pokemon */
const PokemonPictureFunction = async (Pokemonvariable) => {
  try {
    const url = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${Pokemonvariable}`
    );
    const urlJson = await url.json();

    /* de functie werkt met console.log(urlJson.sprites.back_default); */
    return urlJson.sprites.other['official-artwork'].front_default;
  } catch (error) { console.log(error) }

};

/* Haalt een RandomPokemonNaam op zodat deze functie kan 
gebruikt worden als parameter bij functie PokePic */
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

/* Nieuwe Functie Herlaad de Pagina met een niewe foto door de functies PokemonPicture te gebruiken */
const SrcPictureFunction = async () => {
  try {
    let RandomPokemonGen = await RandomPokemonGenerator();
    let SpecialArray = await PokemonPictureFunction(RandomPokemonGen)
    /* imgPokemon word aangemaakt als nieuw element van type img */
    let imgPokemon = document.createElement("img")
    /* dan word er een value in gestoken de speciale url  */
    imgPokemon.setAttribute("src", SpecialArray);
    /* IMG word leegemaakt deze is een section en veranderd in een img dit moet gedaan worden anders kan de imgpokemon 
    er niet in geladen worden omdat het van type img is */
    Img.innerHTML = ""
    /* met appendchild word de imgpokemon en zijn attribuut in de section gestoken en veranderd deze naar een img
    bron = StackOverFlow */
    Img.appendChild(imgPokemon);
    Pokemon.innerHTML = ""
    Pokemon.innerHTML = `${RandomPokemonGen}`
    pokebal.style.backgroundColor = ""
    btn.disabled = false
    counter.textContent = 3;
    PokemonCaughtContainer.style.visibility = "collapse"
    CaughtText.textContent = "";
    btnno.disabled = false
    /* de rest is eigenlijk code die dan word gereset omdat deze veranderd word */


    //img van de partner pokemon ophalen en setten 
    let partnerUrl = await PokemonPictureFunction(partnerName.innerHTML);
    partnerImg.src = partnerUrl;

  } catch (error) {
    console.log(error)
  }
}

/* button voor Pokemon */
btn.addEventListener("click", async () => {
  /* counter start met aftellen bij een click van de button */
  //set de value input met type='hidden' naar de naam vn de pokemon
  NameOutputHidden.value = Pokemon.textContent;
  counter.textContent--;

  const partner = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${partnerName.innerHTML}`)).json()
  let EigenPokemonAttack = partner.stats[1].base_stat;
  let EigenPokemonSpAttack = partner.stats[3].base_stat;;

  /* fetch van pokemon met naam van pokemon die word aangemaakt in Src functie */
  const take = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.textContent}`)).json()
  const PokemonDefenseStats = take.stats[2].base_stat;
  const PokemonSpDefenseStats = take.stats[4].base_stat;

  /* hier word de catch rate berekend */
  let Formule;
  let wildDefenseSum = PokemonDefenseStats + PokemonSpDefenseStats;
  let partnerAttackSum = EigenPokemonAttack + EigenPokemonSpAttack;
  if (wildDefenseSum < partnerAttackSum) {
    Formule = ((partnerAttackSum) - (wildDefenseSum));
  }
  else {
    Formule = ((wildDefenseSum) - (partnerAttackSum));
  }

  const Getal1totFormule = Math.floor(Math.random() * (Formule * 2))

  console.log(Formule)
  console.log(Getal1totFormule)
  




  if (Formule <= Getal1totFormule) {
    ColorGreen();
    btn.disabled = true
    PokemonCaughtContainer.style.visibility = "visible"
    CaughtText.textContent = `je hebt ${Pokemon.textContent} gevangen`
    btnyes.addEventListener("click", () => {
      CaughtText.textContent = `${Pokemon.textContent} is nu van jouw Click Op Next Pokemon Voor verder te gaan `
      btnno.disabled = true
    })
    btnno.addEventListener("click", SrcPictureFunction)
  } else {
    if (counter.textContent == 0) {
      btn.disabled = true
    }
    ColorRed();
  }
})

btnNext.addEventListener("click", SrcPictureFunction)
SrcPictureFunction();

/* Als je een pokemon vangt kan je deze bijhouden dan moet je op yes drukken anders no en dan krijg je een nieuwe pokemon te zien
als je op yes drukt word de no knop ui gezet en moet je op click next Pokemon drukken. */