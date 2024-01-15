/*Here, you can export the functions you did for lab 3
to get the authors, books, getBookByID, getAuthorById.  You will import these functions into your routing files and call the relevant function depending on the route. 

*/
import axios from "axios";

async function getAuthors(){
    const { data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json')
    return data
}

async function getBooks(){
    const { data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
    return data
}

function checkstring(str) {
    if (typeof str !== 'string'){ throw new Error('not a string')}
    if (str.trim().length === 0){ throw new Error('empty input')}
    return str.trim();
}
export const getAllAuthor = async () => {
    const authors = await getAuthors();
    return authors
}
export const getAuthorById = async (id) => {
    id = checkstring(id);
    const author = await getAuthors();
    let res = {};
    for (let i of author){
        if (i['id'] == id){
            res = i;
            break}}
    if (Object.keys(res).length === 0) {throw new Error('author not found')}
    else { return res}
};
export const getAllBook = async () => {
    const books = await getBooks();
    return books
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
    if (Object.keys(res).length === 0) {throw new Error('author not found')}
    else { return res}
};