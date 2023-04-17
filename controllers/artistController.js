import getData from "../services/artist.service.js";

export async function get(req, res, next) {
    try {
        const data = await getData(req);
        res.render('pages/artist', {
            img: data.artist.visual[0].url,
            artistName: data.artist.artistName,
            biography: data.overview.biography
        })
    }
    catch(err) {
        next(err)
    }
}