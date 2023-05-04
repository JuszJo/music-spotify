export default function makeParagraph(text) {
    let maxWords = 1000;
    let points = text.length / maxWords < 1 ? text.length : maxWords;
    let array = [];

    for(let i = 0; i < text.length; i += points) array.push(String(text).slice(i, i + points))

    return array;
}

/* exports.makeParagraph = (text, paragraphAmount) => {
    let points = text.length / paragraphAmount;   
    let array = [];

    for(let i = 0; i < text.length; i += points) array.push(String(text).slice(i, i + points))

    return array;
} */