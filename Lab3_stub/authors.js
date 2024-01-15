//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data
import axios from 'axios';


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

function checknumber(int) {
    if (typeof int !== 'number') {throw new Error('not a number')}
    return int
}


export const getAuthorById = async (id) => {
    id = checkstring(id);
    const author = await getAuthors();
    let res = {};
    for (let i of author){
        if (i['id'] == id){
            res = i;
            break}}
    if (Object.keys(res).length == 0) {throw new Error('author not found')}
    else { return res}
};

export const searchAuthorByName = async (searchTerm) => {
    searchTerm = checkstring(searchTerm)
    const author = await getAuthors();
    let res = []
    searchTerm = searchTerm.trim().toLowerCase();
    for (let i of author){
        if (i.first_name.toLowerCase().match(searchTerm) || i.last_name.toLowerCase().match(searchTerm)){
            res.push([i.first_name.trim(), i.last_name.trim()].join(' '))
        }
    }
    if (res.length == 0) {throw new Error('since there are no results')}
    else{
        return res.sort(function(a, b) {
            let aname = a.split(' ');
            let bname = b.split(' ') ;
            return aname[1].localeCompare(bname[1])});
        }
    

};

export const getBookNames = async (firstName, lastName) => {
    firstName = checkstring(firstName);
    lastName = checkstring(lastName);
    let res = []
    let bookname = new Map();
    const author = await getAuthors();
    const books = await getBooks();
    for (let k of books){
        bookname.set(k.id, k.title)
    }
    for (let i of author) {
        if ((i.first_name.toLowerCase() === firstName.toLowerCase()) && (i.last_name.toLowerCase() === lastName.toLowerCase())){
            let temp = i.books
            for (let j of temp) {
                res.push(bookname.get(j))
            }
        }
    }
    if (res.length === 0) {throw new Error ('author can be found') }
    else {return res.sort()}
    

};

export const youngestOldest = async () => {
    const author = await getAuthors();
    let oldYear = Number(author[0].date_of_birth.split('/')[2])
    let youngYear = Number(author[0].date_of_birth.split('/')[2])
    let oldSameYear = new Map();
    let youngSameYear = new Map();
    for (let i of author){
        if (Number(i.date_of_birth.split('/')[2]) < oldYear) {
            oldYear = Number(i.date_of_birth.split('/')[2])
            oldSameYear = new Map()
            let temp = i.date_of_birth.split('/')
            if (temp[1].length == 1) {temp[1] = '0'+temp[1]}
            oldSameYear.set(Number(temp[0]+temp[1]), i.first_name.trim()+ ' ' + i.last_name.trim())
        } else if (Number(i.date_of_birth.split('/')[2]) == oldYear){
            let temp = i.date_of_birth.split('/')
            if (temp[1].length == 1) {temp[1] = '0'+temp[1]}
            oldSameYear.set(Number(temp[0]+temp[1]), i.first_name.trim()+ ' ' + i.last_name.trim())
        }
        else if (Number(i.date_of_birth.split('/')[2]) > youngYear) {
            youngYear = Number(i.date_of_birth.split('/')[2])
            youngSameYear = new Map()
            let temp = i.date_of_birth.split('/')
            if (temp[1].length == 1) {temp[1] = '0'+temp[1]}
            youngSameYear.set(Number(temp[0]+temp[1]), i.first_name.trim()+ ' ' + i.last_name.trim())
        }
        else if (Number(i.date_of_birth.split('/')[2]) == youngYear) {
            let temp = i.date_of_birth.split('/')
            if (temp[1].length == 1) {temp[1] = '0'+temp[1]}
            youngSameYear.set(Number(temp[0]+temp[1]), i.first_name.trim()+ ' ' + i.last_name.trim())   
        }
    }
    oldSameYear = Array.from(oldSameYear).sort((a, b) => a[0] - b[0]);
    oldSameYear = new Map(oldSameYear)
    youngSameYear = Array.from(youngSameYear).sort((a, b) => a[0] - b[0]);
    youngSameYear = new Map(youngSameYear)
    const old = oldSameYear.keys()
    const young = youngSameYear.keys()
    return {youngest:youngSameYear.get(young.next().value), oldest:oldSameYear.get(old.next().value)}
};

export const sameBirthday = async (month, day) => {
    month = checknumber(month);
    day = checknumber(day);
    if (month > 12 || month < 1) {throw new Error('wrong month')}
    let solarMonth = [1, 3, 5, 7, 8, 10, 12]
    let lunerMonth = [4, 6, 9, 11]
    if (solarMonth.includes(month) && (day < 1 || day > 31)) {throw new Error('wrong date')}
    else if(lunerMonth.includes(month) && (day < 1 || day > 30)) {throw new Error('wrong date')}
    else if(month === 2 && (day < 1 || day > 28)) {throw new Error('wrong date')}
    const author = await getAuthors();
    let res = []
    for (let i of author){
        let birth = i.date_of_birth.split('/')
        if (birth[0] == month && birth[1] == day){
            res.push([i.first_name.trim(), i.last_name.trim()].join(' '))
        }
    }
  
    if (res.length <= 1) {throw new Error('no two authors with that same birthday')}
    else{return res.sort(function(a, b) {
        let aname = a.split(' ');
        let bname = b.split(' ') ;
        return aname[1].localeCompare(bname[1])});
    }
};
