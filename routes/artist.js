const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
require('dotenv').config()

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.XRAPIDAPIKEY,
        'X-RapidAPI-Host': process.env.XRAPIDAPIHOST
    }
};

//Global Variables
let url = new URL('https://spotify23.p.rapidapi.com/search/?q=arianagrande&type=multi&offset=0&limit=10&numberOfTopResults=5');
let artistOverviewUrl = new URL('https://spotify23.p.rapidapi.com/artist_overview/?id=66CXWjxzNUsdJxJ2JdwvnR');

let artistQuery = {
    artist: "",

    setArtist(art) {
        this.artist = art
    },

    setParam() {
        url.searchParams.set("q", this.artist);
        url.search = url.searchParams;
    }
}

let artistOverview = {
    getID(uri) {
        return uri.slice(15)
    },

    setID(url, uri) {
        url.searchParams.set("id", this.getID(uri));
    }
}

async function getArtist() {
    try {
        let res = await fetch(url, options);

        if(!res.ok) throw new Error("Something went wrong");

        let json = await res.json();

        if(json.artists.totalCount == 0) return false;

        let artistObj = {
            artistName: json.artists.items[0].data.profile.name,
            visual: json.artists.items[0].data.visuals.avatarImage.sources,
            uri: json.artists.items[0].data.uri
        }
        return artistObj;
    }
    catch(err) {
        if(err) console.error("Something went wrong!", err);
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

    catch(err) {
        if(err) console.error("Something went wrong!", err);
    }
}

router.get('/artist', (req, res) => {
    if(req.session.user) {
        artistQuery.setArtist(req.query.text);
        artistQuery.setParam();

        let renderData = async () => {
            try {
                let artist = await getArtist();

                if(!artist) res.redirect('/');
                else {
                    artistOverview.setID(artistOverviewUrl, artist.uri);
                    let overview = await getArtistOverview();
        
                    res.render('pages/artist', {
                        img: artist.visual[0].url,
                        artistName: artist.artistName,
                        biography: overview.biography
                    });
                }
            } 
            catch(err) {
                if(err) console.error("Something went wrong!", err);
            }
        }
        renderData()
    }
    else {
        res.redirect('/login');
    }
})

module.exports = router;