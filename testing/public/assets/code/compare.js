//adhv de index van de pokemon haalt het de stats (getallen) op
const PokemonStatsNumbers = async (currentPokemon) =>{
    let PokemonStatsNum = [];
    let pokemonUrl = (await fetch(`https://pokeapi.co/api/v2/pokemon/${currentPokemon}`)).json();

    for (let index = 0; index < pokemonUrl.stats; index++) {   
        PokemonStatsNum[index] = pokemonUrl.stats[index].base_stat;
    }

    return PokemonStatsNum;
};
//haalt de namen van de stats op (maakt niet uit van welke pokemon het komt)
const PokemonStatsNames = async () =>{
    let PokemonStatsNames = [];
    let pokemonUrl = (await fetch(`https://pokeapi.co/api/v2/pokemon/1`)).json();

    for (let index = 0; index < pokemonUrl.stats; index++) {   
        PokemonStatsNames[index] = pokemonUrl.stats[index].stat.name;       
    }

    return PokemonStatsNames;
};

//functie wordt uitgevoerd elke keer als de value van een dropdown veranderd bij de comparer
const OnChange = async () => {
    //geeft de op dit moment geselecteerde pokemon in de dropdowns
    let currentPokemonLeft = document.getElementById("pokeleft").value;    
    //let currentPokemonRight = document.getElementById("pokeRight").value;
    //arrays van de stats van de huidige pokemon en de namen van de stats
    let leftStatsNum = await PokemonStatsNumbers(currentPokemonLeft);
    //let rightStatsNum = await PokemonStatsNumbers(currentPokemonRight);
    let statNames =  await PokemonStatsNames();
    
    //linkse pokemon stats inlezen in section
    for (let index = 0; index < statNames.length; index++) {
        let stat = `$<span>${statNames[index]} ${leftStatsNum[i]}</span><br>`;
        document.getElementById("left").innerHTML += `$<span>${statNames[index]} ${leftStatsNum[i]}</span><br>`;        
    }

    //rechtse pokemon stats inlezen in section
    //for (let index = 0; index < statNames.length; index++) {
    //    let stat = `$<span>${statNames[index]} ${rightStatsNum[i]}</span><br>`;
    //    document.getElementById("right").insertAdjacentHTML("afterbegin", stat)        
    //}
}
