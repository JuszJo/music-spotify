import getData from "../services/artist.service.js";

export async function artistHandler(req, res, next) {
    try {
        const {artist, overview} = await getData(req);
    
        res.render('pages/artist', {
            img: artist?.visual[0]?.url,
            artistName: artist.artistName,
            biography: overview.biography,
            monthlyCount: overview.monthlyCount,
            followerCount: overview.followerCount,
        })
    }
    catch(err) {
        next(err)
    }
}