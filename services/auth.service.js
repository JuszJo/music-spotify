import { MongoClient } from 'mongodb';
import databaseConfig from '../config/mongo.config.js';

const mongoURI = databaseConfig.url;

const client = new MongoClient(mongoURI);

function validateUser(result, password) {
    return result.password == password ? true : false;
}

export async function getUser(username, password) {
    try {
        await client.connect();
        await client.db("spotify").command({ping: 1});
        console.log("Connected");
        
        let result = await client.db("spotify").collection("users").findOne({
            username: username,
        });

        return result == null ? false : validateUser(result, password);
    } 
    catch(err) {
        if(err) console.error("Something went wrong!", err);
    }
    finally {
        console.log("Connection Closed");
        await client.close();
    }
}