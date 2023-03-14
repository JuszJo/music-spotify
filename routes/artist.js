const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const app = express();
require('dotenv').config()
//const fs = require('fs');

app.use(express.urlencoded({extended: true}));

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.XRAPIDAPIKEY,
        'X-RapidAPI-Host': process.env.XRAPIDAPIHOST
    }
};

let url = new URL('https://spotify23.p.rapidapi.com/search/?q=arianagrande&type=multi&offset=0&limit=10&numberOfTopResults=5');
let params = new URLSearchParams(url.search);

let searchQuery = {
    artist: "xxx",
    set(art) {
        this.artist = art
    }
}

function setParam(object) {
    params.set("q", object.artist);
    url.search = params;
}

async function getArtist() {
    try {
        let res = await fetch(url, options);

        if(!res.ok) {
            throw new Error("Something went wrong");
        }

        let json = await res.json();

        let artistObj = {
            artistName: json.artists.items[0].data.profile.name,
            visual: json.artists.items[0].data.visuals.avatarImage.sources
        }
        return artistObj;
        
    } catch (err) {
        console.log(err);
    }
}

router.get('/artist', (req, res) => {
    if(req.session.user) {
        searchQuery.set(req.query.text)
        setParam(searchQuery);

        let renderData = async () => {
            let artist = await getArtist();
            res.render('pages/artist', {
                img: artist.visual[0].url,
                artistName: artist.artistName
            });
        }
        renderData()
    }
    else {
        res.redirect('/login');
    }
})

module.exports = router;