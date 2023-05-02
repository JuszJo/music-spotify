import dotenv from "dotenv"
dotenv.config();

export const config = {
    options: {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.XRAPIDAPIKEY,
            'X-RapidAPI-Host': process.env.XRAPIDAPIHOST
        }
    },

    url: new URL('https://spotify23.p.rapidapi.com/search/?q=arianagrande&type=multi&offset=0&limit=10&numberOfTopResults=5'),
    artistOverviewUrl: new URL('https://spotify23.p.rapidapi.com/artist_overview/?id=66CXWjxzNUsdJxJ2JdwvnR'),
}