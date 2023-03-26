const express = require('express');
const {MongoClient} = require('mongodb')
const app = express();


const router = express.Router();

const mongoURI = `mongodb+srv://${process.env.NAME}:${process.env.PASSWD}@cluster0.xjoqb.mongodb.net`

const client = new MongoClient(mongoURI);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

async function getUser(username, password) {
    try {
        await client.connect();
        await client.db("spotify").command({ping: 1})
        console.log("Connected")

        let result = await client.db("spotify").collection("users").findOne({
            username: username,
        })

        if(result.username == username && result.password == password) {
            return true;
        }
        return false;
    } 
    catch(err) {
        if(err) console.error("Something went wrong!", err);
    }
    finally {
        console.log("Connection Closed")
        await client.close();
    }
}


router.post('/welcome', async (req, res) => {
    try {
        if(await getUser(req.body.username, req.body.password) == true) {
            req.session.user = req.body.username;
            res.render('pages/welcome');
        }
        else {
            res.redirect('/login')
        }
    }
    catch(err) {
        if(err) console.error("Something went wrong!", err);
    }
})

router.get('/welcome', (req, res) => {
    if(req.session.user) {
        res.render('pages/welcome');
    }
    else {
        res.redirect('/login')
    }
})

module.exports = router;