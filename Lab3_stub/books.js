//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import axios from 'axios'

async function getBooks(){
    const { data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
    return data
}
async function getAuthors(){
    const { data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
    return data
}

function checkstring(str) {
    if (typeof str !== 'string'){ throw new Error('not a string')}
    if (str.trim().length === 0){ throw new Error('empty input')}
    return str.trim();
}

function checknumber(int) {
    if (typeof int !== 'number') {throw new Error('not a number')}
    if (int == Infinity) {throw new Error('should be a number')}
    return int
}


export const getBookById = async (id) => {
    id = checkstring(id);
    const books = await getBooks();
    let res = {};
    for (let i of books){
        if (i.id === id){
            res = i;
            break}
    }
    if (Object.keys(res).length == 0) {throw new Error('author not found')}
    else { return res}
};

export const getAuthorName = async (bookId) => {
    bookId = checkstring(bookId)
    const books = await getBooks();
    const author = await getAuthors();
    let res = ''
    let findAuthor = undefined
    for (let i of books) {
        if (i.id === bookId) {
            findAuthor = i.authorId
            break}
    }
    for (let j of author){
        if (j.id === findAuthor){
            res = j.first_name + " " +j.last_name
            break}
    }

    if (res.length == 0) { throw new Error('book not found')}
    else{ return res}
};

export const sameGenre = async (genre) => {
    genre = checkstring(genre)
    const books = await getBooks();
    let res = []
    for (let i of books) {
        let temp = i.genres.map(word => word.toLowerCase())
        if (temp.includes(genre.toLowerCase())){
            res.push(i)
        }}
    if (res.length == 0){ throw new Error('no book match')}
    else{ return res}
};

export const priceRange = async (min, max) => {
    min = checknumber(min)
    max = checknumber(max)
    if (min >= max) {throw new Error('min >= max')}
    if (min < 0) {throw new Error('min < 0')}
    const books = await getBooks();
    let res = []
    for (let i of books){
        if (i.price >= min && i.price <= max){
            res.push(i)
        }}
    if (res.length == 0) {throw new Error('no books match')}
    else{ return res}
};

export const getAllBooksWithAuthorName = async () => {
    const books = await getBooks();
    const author = await getAuthors();
    let res = []
    for (let i of books){
        let authorid = i.authorId
        delete i.authorId
        let temp = i
        for (let j of author){
            if (j.id === authorid){
                temp['author'] = j.first_name+ ' '+ j.last_name
                break}}
        res.push(temp)
    }
    return res
};


