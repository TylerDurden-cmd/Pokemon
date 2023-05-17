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

export{connect, AddUser, FindUserbyUsername};