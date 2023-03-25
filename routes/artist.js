const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const app = express();
require('dotenv').config()
//const fs = require('fs');

app.use(express.urlencoded({extended: true}));
// app.use(express.json())

//Global Variables
let url = new URL('https://spotify23.p.rapidapi.com/search/?q=arianagrande&type=multi&offset=0&limit=10&numberOfTopResults=5');
let artistOverviewUrl = new URL('https://spotify23.p.rapidapi.com/artist_overview/?id=66CXWjxzNUsdJxJ2JdwvnR');

let params = new URLSearchParams(url.search);

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.XRAPIDAPIKEY,
        'X-RapidAPI-Host': process.env.XRAPIDAPIHOST
    }
};

let searchQuery = {
    artist: "xxx",
    set(art) {
        this.artist = art
    }
}

function getID(uri) {
    return uri.slice(15)
}

function setID(url, uri) {
    url.searchParams.set("id", getID(uri))
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
            visual: json.artists.items[0].data.visuals.avatarImage.sources,
            uri: json.artists.items[0].data.uri
        }
        return artistObj;
        
    } catch (err) {
        console.log(err);
    }
}

async function getArtistOverview() {
    try {
        let res = await fetch(artistOverviewUrl, options);
    
        if(!res.ok) throw new Error("Something went wrong");
    
        let json = await res.json();
    
        let artistOverview = {
            biography: json.data.artist.profile.biography.text
        }
    
        return artistOverview;
    }

    catch(error) {
        console.log(error)
    }
}


router.get('/artist', (req, res) => {
    if(req.session.user) {
        searchQuery.set(req.query.text)
        setParam(searchQuery);

        let renderData = async () => {
            let artist = await getArtist();

            setID(artistOverviewUrl, artist.uri)

            let overview = await getArtistOverview();

            res.render('pages/artist', {
                img: artist.visual[0].url,
                artistName: artist.artistName,
                biography: overview.biography
            });
        }
        renderData()
    }
    else {
        res.redirect('/login');
    }
})

module.exports = router;