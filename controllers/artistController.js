import getData from "../services/artist.service.js";
import makeParagraph from "../utils/makeParagraph.utils.js";

export async function artistHandler(req, res, next) {
    try {
        const data = await getData(req);
        res.render('pages/artist', {
            img: data.artist.visual[0].url,
            artistName: data.artist.artistName,
            biography: data.overview.biography,
            func: makeParagraph
        })
    }
    catch(err) {
        next(err)
    }
}