import {MongoClient} from "mongodb"
//Pichu Partners Database
const uri = "mongodb+srv://s145053:nkeI6RQVBJYBgg41@pichupartners.ah3odo1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const exit = async () => {
  try {
    await client.close();
    console.log("Succesfully disconnected from Pichu Partners Database!");
    process.exit(0);
  } catch (error) {
    console.error(error)
  }

}
const connect = async () => {
  try {
    await client.connect();
    console.log("Succesfully connected to Pichu Partners Database!");
    process.on("SIGINT", exit);
  } catch (error) {
    console.error(error)
  }
}

const AddUser = async (firstname, lastname, username, mail, hashedPassword, salt ) =>{
    try{
        client.db("Pichu").collection('Users').insertOne({ firstname, lastname, username, mail, password: hashedPassword, salt });
    }
    catch (error){
        console.error(error)
    }   
}
const FindUserbyUsername = async (username) =>{
    return await client.db("Pichu").collection('Users').findOne({username: username}); 
}
const FindUserInMyPartner = async (username) =>{
  return await client.db("Pichu").collection('MyPartner').findOne({username: username}); 
}
const AddPokemonToUser = async (username, pokemon) =>{
  try {
    
    if (await FindUserInMyPartner(username) != null) {
      //als je al pokemon hebt en dus al in de myPartner database zit wordt de array geupdate, anders wordt er een array aangemaakt
      client.db("Pichu").collection('MyPartner').updateOne({username: username}, {$push:{ pokemon: pokemon}});
    }
    else{
      client.db("Pichu").collection('MyPartner').insertOne({username: username, pokemon: [pokemon], partner: ""});
    }
  } catch (error) {
    console.error(error);
  }
}
const getAllPokemonFromUser = async (username) =>{
  let user = await client.db("Pichu").collection('MyPartner').findOne({username: username});
  let userPokemon = []; 
  let nullString = "you haven't caught any pokemon";
  for (let index = 0; index < user.pokemon.length; index++) {
    //als je geen pokemon hebt wordt er een string gereturned
    if (!user.pokemon[index]) {
      return nullString;
    }
    userPokemon.push(user.pokemon[index])
  }
  return userPokemon; 
}
const setPartner = async (username, pokemon) =>{
  try {
    client.db("Pichu").collection('MyPartner').updateOne({username: username}, {$set:{ partner: pokemon}});
  } catch (error) {
    console.error(error);
  }
}
const getPartner = async (username) =>{
  let user = await client.db("Pichu").collection('MyPartner').findOne({username: username}); 
  //als partner leeg is wordt pichu gereturned
  if (user.partner == "" || user.partner == null) {
    return "pichu";
  }
  else{
    return user.partner;
  }
}
const removePokemon = async (username, pokemon) =>{
  try {
    client.db("Pichu").collection('MyPartner').updateOne({username: username} ,{ $pull: {pokemon:{ $in: [pokemon]}}});
  } catch (error) {
    console.error(error);
  }
}

export{connect, AddUser, FindUserbyUsername, AddPokemonToUser, getAllPokemonFromUser, setPartner, getPartner, removePokemon};