let compareBtn = document.querySelector(".comparebtn");
let leftSection = document.querySelector(".LeftStats");
let rightSection = document.querySelector(".RightStats");
let leftName = document.querySelector("#PokemonNaamLeft");
let rightName = document.querySelector("#PokemonNaamRight");
let PokemonImages = document.querySelectorAll(".imgvergelijk");
let leftTypep = document.querySelector("#PokemonTypeLeft");
let rightTypep = document.querySelector("#PokemonTypeRight");
let redColor = `style="color:red"`;
let greenColor = `style="color:green"`;
let orangeColor = `style="color:orange"`;
let whiteColor = `style="color:white"`;


//adhv de index van de pokemon haalt het de stats (getallen) op
const PokemonStatsNumbers = async (currentPokemon) =>{
    let PokemonStatsNum = [];
    let pokemonUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`).then(res => res.json());

    for (let index = 0; index < pokemonUrl.stats.length; index++) {   
        PokemonStatsNum[index] = pokemonUrl.stats[index].base_stat;
    }

    return PokemonStatsNum;
};
//haalt de namen van de stats op (maakt niet uit van welke pokemon het komt)
const PokemonStatsNames = async () =>{
    let PokemonStatsNames = [];
    let pokemonUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/1`).then(res => res.json());

    for (let index = 0; index < pokemonUrl.stats.length; index++) {   
        PokemonStatsNames[index] = pokemonUrl.stats[index].stat.name;       
    }

    return PokemonStatsNames;
};
//haalt afbeelding van de pokemon op
const getImgURL = async (currentPokemon) =>{
    let pokemonUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`).then(res => res.json());
    return pokemonUrl.sprites.other['official-artwork'].front_default;
}
//haalt types op van een pokemon
const getTypes = async (currentPokemon) =>{
    let pokemonTypes = [];
    let pokemonUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`).then(res => res.json());

    for (let index = 0; index < pokemonUrl.types.length; index++) {
       pokemonTypes[index] = pokemonUrl.types[index].type.name;        
    }
    return pokemonTypes;
}
compareBtn.addEventListener('click', async()=>{
let leftColor ="";
let rightColor ="";
//geeft de op dit moment geselecteerde pokemon in de dropdown
let currentPokemonLeft = document.getElementById("pokeleft").value;
let currentPokemonRight = document.getElementById("pokeright").value;
//arrays van de stats van de huidige pokemon en de namen van de stats
let leftStatsNum = await PokemonStatsNumbers(currentPokemonLeft);
let rightStatsNum = await PokemonStatsNumbers(currentPokemonRight);
let statNames =  await PokemonStatsNames();
//linkse pokemon stats inlezen in section
leftSection.innerHTML = "";
rightSection.innerHTML = "";
for (let index = 0; index < statNames.length; index++) {

        if (leftStatsNum[index] > rightStatsNum[index]) {
            leftColor = greenColor;
            rightColor = redColor;
        }
        else if (leftStatsNum[index] < rightStatsNum[index]) {
            rightColor = greenColor;
            leftColor = redColor;
        }
        else if (leftStatsNum[index] == rightStatsNum[index]) {
            rightColor = orangeColor;
            leftColor = orangeColor;
        }

    let leftstat =  `<span ${leftColor}>${statNames[index]}: ${leftStatsNum[index]} </span><br>`;
    let rightstat = `<span ${rightColor}>${statNames[index]}: ${rightStatsNum[index]}</span><br>`;

//update section met stats van de pokemon
    leftSection.innerHTML += leftstat; 
    rightSection.innerHTML += rightstat;
}
//update h3 met naam van de pokemon
leftName.textContent = currentPokemonLeft;
rightName.textContent = currentPokemonRight;
//update img.src met official artwork (is meer HD)
PokemonImages[0].src = await getImgURL(currentPokemonLeft);
PokemonImages[1].src = await getImgURL(currentPokemonRight);
//update type paragraaf met types
let leftTypes = await getTypes(currentPokemonLeft);
let rightTypes = await getTypes(currentPokemonRight);
leftTypep.textContent = "type: ";
rightTypep.textContent = "type: ";
for (let index = 0; index < leftTypes.length; index++) {
    leftTypep.textContent += ` ${leftTypes[index]} `;    
}
for (let index = 0; index < rightTypes.length; index++) {
    rightTypep.textContent += ` ${rightTypes[index]} `;    
}
});