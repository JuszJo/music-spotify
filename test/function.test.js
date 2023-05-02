const { makeParagraph } = require('../utils/makeParagraph.utils')

test('trim "Joshua", 2 to equal ["Jos", "hua"]', () => {
    expect(makeParagraph("Joshua", 2)).toMatchObject(["Jos", "hua"]);
})

test('trim "Joshua ", 2 to equal ["Jos", "hua "]', () => {
    expect(makeParagraph("Joshua ", 2)).toMatchObject(["Jos", "hua "]);
})

test('trim "Hello, my name is Joshua", 2 to equal ["Hello, my na", "me is Joshua"]', () => {
    expect(makeParagraph("Hello, my name is Joshua", 2)).toMatchObject(["Hello, my na", "me is Joshua"]);
})

test('trim "Hello, my name is Joshua", 3 to equal ["Hello, m", "y name i", "s Joshua"]', () => {
    expect(makeParagraph("Hello, my name is Joshua", 3)).toMatchObject(["Hello, m", "y name i", "s Joshua"]);
})