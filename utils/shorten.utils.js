/* export default function shorten(text, amount) {
    let points = text.length / amount;
    let array = [];

    for(let i = 0; i < text.length; i += (points - 1)) {
        array.push(String(text).slice(i, i + (points - 1)))
    }

    return array;
} */

exports.shorten = (text, amount) => {
    let points = text.length / amount;   
    let array = [];

    for(let i = 0; i < text.length; i += points) array.push(String(text).slice(i, i + points))

    return array;
}