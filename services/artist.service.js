import fetch from 'node-fetch';
import { config } from '../config/spotify.config.js';
import dotenv from "dotenv";
dotenv.config();

const options = config.options;

let url = config.url;
let artistOverviewUrl = config.artistOverviewUrl;

let artistQuery = {
    artist: "",

    setArtist(art) {
        this.artist = art;
    },

    setParam() {
        url.searchParams.set("q", this.artist);
        url.search = url.searchParams;
    }
}

let artistOverview = {
    getID(uri) {
        return uri.slice(15);
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
        if(err) throw err;
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
        if(err) throw err;
    }
}

export default async function getData(req) {
    artistQuery.setArtist(req.query.text);
    artistQuery.setParam();

    try {
        const artist = await getArtist();

        artistOverview.setID(artistOverviewUrl, artist.uri);

        const overview = await getArtistOverview();

        return {artist, overview}
    }
    catch(err) {
        if(err) throw err;
    }
}