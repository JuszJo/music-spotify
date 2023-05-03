import dotenv from 'dotenv';
dotenv.config();

const prod = false;

let databaseConfig = {};

if(prod) {
    databaseConfig = {
        url: `mongodb+srv://${process.env.NAME}:${process.env.PASSWD}@cluster0.xjoqb.mongodb.net/test`
    }
}
else {
    databaseConfig = {
        url: `mongodb://127.0.0.1:27017/test`
    }
}

export default databaseConfig;