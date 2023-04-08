const express = require('express');
const {MongoClient} = require('mongodb')
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const router = express.Router();

const mongoURI = `mongodb+srv://${process.env.NAME}:${process.env.PASSWD}@cluster0.xjoqb.mongodb.net`
const client = new MongoClient(mongoURI);

function validateUser(result, password) {
    return result.password == password ? true : false;
}

async function getUser(username, password) {
    try {
        await client.connect();
        await client.db("spotify").command({ping: 1})
        console.log("Connected")
        
        let result = await client.db("spotify").collection("users").findOne({
            username: username,
        })

        return result == null ? false : validateUser(result, password);
    } 
    catch(err) {
        if(err) console.error("Something went wrong!", err);
    }
    finally {
        console.log("Connection Closed")
        await client.close();
    }
}

router.get('/login', (req, res) => {
    res.render('pages/login');
})

router.post('/login', async (req, res) => {
    try {
        if(await getUser(req.body.username, req.body.password) == true) {
            req.session.user = req.body.username;
            res.redirect('/welcome')
        }
        else {
            res.redirect('/login')
        }
    }
    catch(err) {
        if(err) console.error("Something went wrong!", err);
    }
})

module.exports = router;